import React, { Component } from 'react';
import './App.css';
import { WordBank } from './WordBank'
import { PuzzleGenerator } from './PuzzleGenerator'

class App extends Component {
  state = {
    words: ['hello', 'world'],
    shouldGenerate: false,
    buttonText: 'Generate'
  }

  onAdd = (word) => {
    const currentWordBank = this.state.words
    currentWordBank.push(word)
    this.setState({words: currentWordBank})
  }

  generateWordFind = () => {
    this.setState({ shouldGenerate: true, noSolution: false })
  }

  handleNoSolution = () => {
    this.setState({ noSolution: true, buttonText: 'Try Again' })
  }

  buildPuzzle = () => {
    if (this.state.shouldGenerate) {
      return (
        <PuzzleGenerator
          wordBank={this.state.words}
          handleNoSolution={this.handleNoSolution}
        />
      )
    }
  }

  render () {
    return (
      <div className='App'>
        <WordBank
          words={this.state.words}
          onAdd={this.onAdd}
        />
        { this.state.noSolution && (
          <div>No solution found including '{this.state.words[this.state.words.length-1]}', try again?</div>
        )}
        {
          this.buildPuzzle()
        } 
        <button className='Button Button--ghost' onClick={this.generateWordFind}>{this.state.buttonText}</button>
      </div>
    )
  }
}

export default App;

