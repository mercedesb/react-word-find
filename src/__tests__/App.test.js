import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme'
import App from '../components/App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

let subject 

function loadSubject (props = {}) {
  subject = shallow(<App
    {...props}
  />)
}

describe('#render', () => {
  it('renders properly', () => {
    loadSubject()
    expect(subject).toMatchSnapshot()
  })
})

describe('#onAdd', () => {
  it('sets the state', () => {
    loadSubject()
    const word = 'newword'
    const initialState = subject.state('words')
    const expectedState = initialState.concat([word])
    subject.instance().onAdd(word)
    expect(subject.state('words')).toEqual(expectedState)
  })
})

describe('#onChange', () => {
  it('sets the state', () => {
    loadSubject()
    subject.instance().onSizeChange({ target: { value: 8 } })
    expect(subject.state('size')).toEqual(8)
  })
})

describe('#generateWordFind', () => {
  it('sets the state', () => {
    loadSubject()
    subject.instance().generateWordFind()
    expect(subject.state('shouldGenerate')).toEqual(true)
  })
})