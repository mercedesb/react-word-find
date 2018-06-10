import React, { Component } from 'react';
import '../styles/App.css';
import { WordBank } from './WordBank'
import { PuzzleGenerator } from './PuzzleGenerator'

class App extends Component {
  state = {
    words: ['hello', 'world'],
    shouldGenerate: false,
    size: 7
  }

  onAdd = (word) => {
    const currentWordBank = this.state.words
    currentWordBank.push(word)
    this.setState({words: currentWordBank})
  }

  onSizeChange = (event) => {
    this.setState({ size: event.target.value })
  }

  generateWordFind = () => {
    this.setState({ shouldGenerate: true })
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
      <div className='App'>
        <div className='WordFind'>
          <WordBank
            words={this.state.words}
            onAdd={this.onAdd}
          />
          <div className='WordFind-config'>
            <label>
              Grid size
              <input 
                type='number'
                onChange={this.onSizeChange}
                value={this.state.size}
              />
            </label>
            <button className='Button Button--ghost' onClick={this.generateWordFind}>Generate Word Find</button>
          </div>
        </div>
        {
          this.buildPuzzle()
        } 
      </div>
    )
  }
}

export default App;

