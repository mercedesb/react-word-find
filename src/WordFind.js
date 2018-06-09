import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { WordBank } from './WordBank'
import { PuzzleGenerator } from './PuzzleGenerator'

export class WordFind extends Component {
  state = {
    words: ['hello', 'world'],
    shouldGenerate: false
  }

  onAdd = (word) => {
    const currentWordBank = this.state.words
    currentWordBank.push(word)
    this.setState({words: currentWordBank})
  }

  generateWordFind = () => {
    this.setState({shouldGenerate: true})
  }

  buildPuzzle = () => {
    if (this.state.shouldGenerate) {
      return (
        <PuzzleGenerator
          wordBank={this.state.words}
        />
      )
    }
  }

  render () {
    return (
      <div className='WordFind'>
      <WordBank
        words={this.state.words}
        onAdd={this.onAdd}
      />
      <button onClick={this.generateWordFind}>Generate Word Find</button>
      
      {
        this.buildPuzzle()
      } 
      </div>
    )
  }
}

WordFind.propTypes = {
}

