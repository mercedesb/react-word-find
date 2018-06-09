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
    grid: {},
    noSolution: false
  }

  static generate = (wordBank) => {
    const sortedWordBank = wordBank.sort((a, b) => b.length - a.length)
    let grid = new Grid()
    const positions = Array.from({length: grid.size}, (value, index) => index)

    const configStack = [ PuzzleGenerator.getNewConfig(grid, sortedWordBank, positions) ]

    let currentConfig
    let direction
    let position

    while(true) {
      currentConfig = configStack[configStack.length - 1]
      if (!currentConfig) {
        return { grid: {}, noSolution: true }
      }

      direction = PuzzleGenerator.getDirection(currentConfig)
      position = currentConfig.positions[currentConfig.positions.length - 1]

      if (!position) {
        sortedWordBank.unshift(currentConfig.word)
        configStack.pop()
      }
      else {
        grid = PuzzleGenerator.tryWord(currentConfig.grid, currentConfig.word, position, direction)

        if (!!grid) {
          if (!!sortedWordBank.length) {
            configStack.push(PuzzleGenerator.getNewConfig(grid, sortedWordBank, positions))
          }
          else {
            // success!
            break
          }
        } 
      }
    }
    
    grid.fill()
    return { grid: grid, noSolution: false }
  }

  static getNewConfig = (grid, sortedWordBank, positions) => {
    return {
      grid: grid,
      word: sortedWordBank.shift(),
      directions: PuzzleGenerator.shuffle(DIRECTIONS),
      positions: PuzzleGenerator.shuffle(positions)
    }
  }

  static getDirection = (config) => {
    let direction = config.directions.pop()
    if (!direction) {
      config.positions.pop()
      config.directions = PuzzleGenerator.shuffle(DIRECTIONS)
      direction = config.directions.pop()
    }
    return direction
  }

  static tryWord = (grid, word, position, direction) => {
    const clone = grid.clone()
    const letters = word.split('')

    let currentRow = clone.row(position)
    let currentColumn = clone.column(position)
    let letter
    let currentIndex

    while (PuzzleGenerator.withinGrid(clone, currentRow, currentColumn)) {
      letter = letters.shift()
      if (!letter) {
        break
      }

      currentIndex = clone.index(currentRow, currentColumn)

      if (PuzzleGenerator.positionAvailable(clone, currentIndex, letter)) {
        clone.setAt(currentIndex, letter)
        currentRow = PuzzleGenerator.getNextRowPosition(direction, currentRow)
        currentColumn = PuzzleGenerator.getNextColumnPosition(direction, currentColumn)
      }
      else {
        return null
      }
    }
    return letters.length > 0 ? null : clone
  }

  static withinGrid = (grid, row, column) => {
    return row >= 0 && row < grid.rows && column >= 0 && column < grid.columns
  }

  static positionAvailable = (grid, position, letter) => {
    return !grid.at(position) || grid.at(position) == letter
  }

  static getNextRowPosition = (direction, row) => {
    return row += direction.moveRow
  }

  static getNextColumnPosition = (direction, column) => {
    return column += direction.moveColumn
  }

  static shuffle = (array) => {
    const clone = array.slice(0)
    for (let i = clone.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [clone[i], clone[j]] = [clone[j], clone[i]]; // eslint-disable-line no-param-reassign
    }
    return clone
  }

  static getDerivedStateFromProps = (props, state) => {
    const wordBank = props.wordBank.slice(0)
    return PuzzleGenerator.generate(wordBank)
  }

  getLetters = () => {
    return this.state.grid.print().map((letter, i) => {
      return <div className='WordPuzzle-letter' key={i}>{letter}</div>
    })
  }

  render () {
    return (
      <div className='WordPuzzle WordPuzzle--seven'>
        { this.state.noSolution && (
            <span>No solution, try again</span>
          )
        }
        { !this.state.noSolution && (
            this.getLetters()
          )
        }
      </div>
    )
  }
}

PuzzleGenerator.propTypes = {
  wordBank: PropTypes.array
}

