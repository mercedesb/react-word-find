/* eslint-env jest */
import * as React from 'react'
import { shallow } from 'enzyme'
import { WordBank } from '../WordBank'

let subject 
let words
let onAdd

function loadSubject (props = {}) {
  words = ['hello', 'world']
  onAdd = jest.fn()
  subject = shallow(<WordBank
    words={words}
    onAdd={onAdd}
    {...props}
  />)
}

describe('#render', () => {
  it('renders properly', () => {
    loadSubject()
    expect(subject).toMatchSnapshot()
  })
})

describe('#onChange', () => {
  it('sets the state', () => {
    loadSubject()
    subject.instance().onChange({ target: { value: 'newword' } } )

    expect(subject.state('newWord')).toEqual('newword')
  })
})

describe('#onAdd', () => {
  it('calls the onAdd function from props', () => {
    loadSubject()
    subject.setState( { newWord: 'newword' } )
    subject.instance().onAdd()
    expect(onAdd).toHaveBeenCalledWith('newword')
  })

  it('sets the state', () => {
    loadSubject()
    subject.setState( { newWord: 'newword' } )
    subject.instance().onAdd()
    expect(subject.state('newWord')).toEqual('')
  })
})







