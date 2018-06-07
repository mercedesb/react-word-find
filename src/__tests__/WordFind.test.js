/* eslint-env jest */
import * as React from 'react'
import { shallow } from 'enzyme'
import { WordFind } from '../WordFind'

let subject 

function loadSubject (props = {}) {
  subject = shallow(<WordFind
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







