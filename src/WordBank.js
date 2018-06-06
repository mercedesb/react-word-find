import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class WordBank extends Component {
  state = {
    newWord: ''
  }

  onChange = (event) => {
    this.setState({ newWord: event.target.value })
  }

  onAdd = () => {
    this.props.onAdd(this.state.newWord)
    this.setState({ newWord: '' })
  }

  render () {
    return (
      <div className='WordBank'>
        { this.props.words.map((word) =>
          <span>{word}</span>
          )
        }
      <input 
        type='text' 
        onChange={this.onChange}
        value={this.state.newWord}
      />
      <button onClick={this.onAdd}>Add Word</button>
      </div>
    )
  }
}

WordBank.propTypes = {
}

