import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { WordBank } from './WordBank'

export class WordFind extends Component {
  state = {
    words: ['hello', 'world']
  }

  onAdd = (word) => {
    const currentWordBank = this.state.words
    currentWordBank.push(word)
    this.setState({words: currentWordBank})
  }

  render () {
    return (
      <div className='WordFind'>
      <WordBank
        words={this.state.words}
        onAdd={this.onAdd}
      />
      </div>
    )
  }
}

WordFind.propTypes = {
}

