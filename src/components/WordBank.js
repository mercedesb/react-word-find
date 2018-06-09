import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class WordBank extends Component {
  state = {
    newWord: ''
  }

  onChange = (event) => {
    this.setState({ newWord: event.target.value })
  }

  onAdd = (event) => {
    event.preventDefault()
    this.props.onAdd(this.state.newWord)
    this.setState({ newWord: '' })
  }

  render () {
    return (
      <div className='WordBank'>
        <div className='WordBank-container'>
          { this.props.words.map((word, i) =>
            <div className='WordBank-word' key={i}>{word}</div>
            )
          }
        </div>
        <form className='WordBank-addContainer'>
          <input 
            type='text' 
            onChange={this.onChange}
            value={this.state.newWord}
          />
          <button type='submit' className='Button Button--ghost' onClick={this.onAdd}>Add Word</button>
        </form>
      </div>
    )
  }
}

WordBank.propTypes = {
  words: PropTypes.array,
  onAdd: PropTypes.func
}

