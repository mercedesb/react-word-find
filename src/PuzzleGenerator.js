import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Grid } from './Grid'

const DIRECTIONS = [
    { // right
      moveRow: 0,
      moveColumn: 1
    },
    { // down
      moveRow: 1,
      moveColumn: 0
    }
  ]

export class PuzzleGenerator extends Component {
  state = {
    grid: {}
  }

  generate = () => {
    const { wordBank } = this.props
    const sortedWordBank = wordBank.sort((a, b) => b.length - a.length)
    let grid = new Grid()
    const positions = Array.from({length: grid.size}, (value, index) => index)

    const configStack = [ this.getNewConfig(grid, sortedWordBank, positions) ]

    let currentConfig
    let direction
    let position

    while(true) {
      currentConfig = configStack[configStack.length - 1]
      if (!currentConfig) {
        throw 'no solution possible'
      }

      direction = this.getDirection(currentConfig)
      position = currentConfig.positions[currentConfig.positions.length - 1]

      if (!position) {
        sortedWordBank.unshift(currentConfig.word)
        configStack.pop()
      }
      else {
        grid = this.tryWord(currentConfig.grid, currentConfig.word, position, direction)

        if (!!grid) {
          if (!!sortedWordBank.length) {
            configStack.push(this.getNewConfig(grid, sortedWordBank, positions))
          }
          else {
            // success!
            break
          }
        } 
      }
    }
    
    grid.fill()
    this.setState({ grid: grid })
  }

  getNewConfig = (grid, sortedWordBank, positions) => {
    return {
      grid: grid,
      word: sortedWordBank.shift(),
      directions: this.shuffle(DIRECTIONS),
      positions: this.shuffle(positions)
    }
  }

  getDirection = (config) => {
    let direction = config.directions.pop()
    if (!direction) {
      config.positions.pop()
      config.directions = this.shuffle(DIRECTIONS)
      direction = config.directions.pop()
    }
    return direction
  }

  tryWord = (grid, word, position, direction) => {
    const clone = grid.clone()
    const letters = word.split('')

    let currentRow = clone.row(position)
    let currentColumn = clone.column(position)
    let letter
    let currentIndex

    while (this.withinGrid(clone, currentRow, currentColumn)) {
      letter = letters.shift()
      if (!letter) {
        break
      }

      currentIndex = clone.index(currentRow, currentColumn)

      if (this.positionAvailable(clone, currentIndex, letter)) {
        clone.setAt(currentIndex, letter)
        currentRow = this.getNextRowPosition(direction, currentRow)
        currentColumn = this.getNextColumnPosition(direction, currentColumn)
      }
      else {
        return null
      }
    }
    return letters.length > 0 ? null : clone
  }

  withinGrid = (grid, row, column) => {
    return row >= 0 && row < grid.rows && column >= 0 && column < grid.columns
  }

  positionAvailable = (grid, position, letter) => {
    return !grid.at(position) || grid.at(position) == letter
  }

  getNextRowPosition = (direction, row) => {
    return row += direction.moveRow
  }

  getNextColumnPosition = (direction, column) => {
    return column += direction.moveColumn
  }

  shuffle = (array) => {
    const clone = array.slice(0)
    for (let i = clone.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [clone[i], clone[j]] = [clone[j], clone[i]]; // eslint-disable-line no-param-reassign
    }
    return clone
  }

  render () {
    return (
      <div>
      </div>
    )
  }
}

PuzzleGenerator.propTypes = {
  wordBank: PropTypes.array
}

