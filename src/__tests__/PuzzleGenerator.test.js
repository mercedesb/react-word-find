/* eslint-env jest */
import * as React from 'react'
import { shallow } from 'enzyme'
import { PuzzleGenerator } from '../PuzzleGenerator'
import { Grid } from '../Grid'

let subject 
let wordBank

function loadSubject (props = {}) {
  wordBank = ['hello', 'world']
  subject = shallow(<PuzzleGenerator
    wordBank={wordBank}
    {...props}
  />)
}

describe('#render', () => {
  it('renders properly', () => {
    loadSubject()
    expect(subject).toMatchSnapshot()
  })
})

describe('#generate', () => {
  describe('when no solution possible', () => {
    it('raises an error', () => {
      const wordBank = [
        'prudence',
        'dog',
        'jenny',
        'bird',
      ]
      loadSubject({wordBank})

      expect(() => {
        subject.instance().generate()
      }).toThrow()
    })
  })

  describe('when solution is possible', () => {
    it('sets the state', () => {
      const wordBank = [
        'pru',
        'magoo',
        'dog',
        'jenny',
        'bird'
      ]
      loadSubject({wordBank})
      subject.instance().generate()
      expect(subject.state('grid').size).toEqual(49)
    })
  })
})

describe('#getNewConfig', () => {
  it('returns an object with the expected shape', () => {
    loadSubject()
    const grid = new Grid()
    const wordBank = ['hello', 'there', 'hi']
    const positions = [0, 1, 2]
    const expectedObj = {
      grid: grid,
      word: 'hello',
      directions: expect.anything(),
      positions: expect.arrayContaining(positions)
    }
    expect(subject.instance().getNewConfig(grid, wordBank, positions)).toMatchObject(expectedObj)
  })
})

describe('#getDirection', () => {
  describe('with a direction in the stack', () => {
    it('returns a direction', () => {
      loadSubject()
      const grid = new Grid()
      const positions = [0, 1, 2]
      const right = {
        moveRow: 0,
        moveColumn: 1
      }

      const config = {
        grid,
        positions,
        directions: [right],
        word: 'hello'
      }

      expect(subject.instance().getDirection(config)).toEqual(right)
    })
  })

  describe('without a direction in the stack', () => {
    it('returns a direction', () => {
      loadSubject()
      const grid = new Grid()
      const positions = [0, 1, 2]
      const directions = []
      const config = {
        grid,
        directions,
        positions,
        word: 'hello'
      }

      expect(subject.instance().getDirection(config)).toBeDefined()
      expect(subject.instance().getDirection(config)).not.toBeNull()
    })
  })

  // TODO: what happens if no direction and no position 
})

describe('#tryWord', () => {
  describe('with a word that will fit within the row', () => {
    it('returns a new grid with the word placed', () => {
      loadSubject()
      const grid = new Grid()
      const word = 'dog'
      const position = 2
      const right = {
        moveRow: 0,
        moveColumn: 1
      }

      const returnedGrid = subject.instance().tryWord(grid, word, position, right)
      expect(returnedGrid).not.toBeNull()
      expect(returnedGrid.at(2)).toEqual('d')
      expect(returnedGrid.at(3)).toEqual('o')
      expect(returnedGrid.at(4)).toEqual('g')
    })
  })
  
  describe('with a word that will not fit within the row', () => {
    it('returns null', () => {
      loadSubject()
      const grid = new Grid()
      const word = 'prudence'
      const position = 2
      const right = {
        moveRow: 0,
        moveColumn: 1
      }
      expect(subject.instance().tryWord(grid, word, position, right)).toBeNull()
    })
  })

  describe('with a word that will fit within the column', () => {
    it('returns a new grid with the word placed', () => {
      loadSubject()
      const grid = new Grid()
      const word = 'dog'
      const position = 2
      const down = {
        moveRow: 1,
        moveColumn: 0
      }
      const returnedGrid = subject.instance().tryWord(grid, word, position, down)
      expect(returnedGrid).not.toBeNull()
      expect(returnedGrid.at(2)).toEqual('d')
      expect(returnedGrid.at(9)).toEqual('o')
      expect(returnedGrid.at(16)).toEqual('g')
    })
  })

  describe('with a word that will fit not within the column', () => {
    it('returns null', () => {
      loadSubject()
      const grid = new Grid()
      const word = 'prudence'
      const position = 2
      const down = {
        moveRow: 1,
        moveColumn: 0
      }
      expect(subject.instance().tryWord(grid, word, position, down)).toBeNull()
    })
  })
})

describe('#withinGrid', () => {
  describe('when rows and columns are inside grid', () => {
    it('returns true', () => {
      const grid = new Grid()
      expect(subject.instance().withinGrid(grid, 3, 3)).toEqual(true)
    })
  })

  describe('when rows is at edge of grid', () => {
    it('returns true', () => {
      const grid = new Grid()
      expect(subject.instance().withinGrid(grid, 0, 3)).toEqual(true)
    })
  })

  describe('when columns is at edge of grid', () => {
    it('returns true', () => {
      const grid = new Grid()
      expect(subject.instance().withinGrid(grid, 3, 6)).toEqual(true)
    })
  })

  describe('when rows are beyond grid', () => {
    it('returns false', () => {
      const grid = new Grid()
      expect(subject.instance().withinGrid(grid, 7, 3)).toEqual(false)
    })
  })

  describe('when rows are beyond grid', () => {
    it('returns false', () => {
      const grid = new Grid()
      expect(subject.instance().withinGrid(grid, 3, 9)).toEqual(false)
    })
  })
})

describe('#positionAvailable', () => {
  describe('when there is nothing at the current position', () => {
    it('returns true', () => {
      loadSubject()
      const grid = new Grid(['h', null, null, 'i' ])
      expect(subject.instance().positionAvailable(grid, 1, 'a')).toEqual(true)
    })
  })

  describe('when the same letter is at the current position', () => {
    it('returns true', () => {
      loadSubject()
      const grid = new Grid(['h', null, null, 'i' ])
      expect(subject.instance().positionAvailable(grid, 0, 'h')).toEqual(true)
    })
  })

  describe('when a different letter is at the current position', () => {
    it('returns true', () => {
      loadSubject()
      const grid = new Grid(['h', null, null, 'i' ])
      expect(subject.instance().positionAvailable(grid, 0, 'a')).toEqual(false)
    })
  })
})

describe('#getNextRowPosition', () => {
  describe('when direction is right', () => {
    it('returns same row index', () => {
      loadSubject()
      
      const right = {
        moveRow: 0,
        moveColumn: 1
      }

      expect(subject.instance().getNextRowPosition(right, 0)).toEqual(0)
    })
  })

  describe('when direction is down', () => {
    it('returns increased row index', () => {
      loadSubject()
        
      const down = { 
        moveRow: 1,
        moveColumn: 0
      }

      expect(subject.instance().getNextRowPosition(down, 0)).toEqual(1)
    })
  })
})

describe('#getNextColumnPosition', () => {
  describe('when direction is right', () => {
    it('returns increased column index', () => {
      loadSubject()
      
      const right = {
        moveRow: 0,
        moveColumn: 1
      }

      expect(subject.instance().getNextColumnPosition(right, 0)).toEqual(1)
    })
  })

  describe('when direction is down', () => {
    it('returns same column index', () => {
      loadSubject()
        
      const down = { 
        moveRow: 1,
        moveColumn: 0
      }

      expect(subject.instance().getNextColumnPosition(down, 0)).toEqual(0)
    })
  })
})

describe('#shuffle', () => {
  it('returns a new array', () => {
    loadSubject()
    expect(subject.instance().shuffle(wordBank)).not.toBe(wordBank)
  })

  it('returns an array with the same items', () => {
    loadSubject()
    expect(subject.instance().shuffle(wordBank)).toEqual(expect.arrayContaining(wordBank))
  })
})
