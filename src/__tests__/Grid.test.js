import { Grid } from '../Grid'

let grid 
let subject

function loadSubject (props = {}) {
  subject = shallow(<WordFind
    {...props}
  />)
}

describe('Grid', () => {
  beforeEach(() => {
    grid = new Grid()
  })

  describe('#size', () => {
    it ('returns 49', () => {
      expect(grid.size).toEqual(49)
    })
  })

  describe('#rows', () => {
    it ('returns 7', () => {
      expect(grid.rows).toEqual(7)
    })
  })

  describe('#columns', () => {
    it ('returns 7', () => {
      expect(grid.columns).toEqual(7)
    })
  })

  describe('#index', () => {
    it ('returns the correct index', () => {
      expect(grid.index(4, 5)).toEqual(33)
    })
  })

  describe('#row', () => {
    it ('returns the correct row position given an index', () => {
      expect(grid.row(33)).toEqual(4)
    })
  })

  describe('#column', () => {
    it ('returns the correct column position given an index', () => {
      expect(grid.column(33)).toEqual(5)
    })
  })

  // TODO: update these tests after the size of the grid is configurable. 
  // these aren't great right now

  describe('#at', () => {
    describe('with an empty grid', () => {
      it ('returns undefined', () => {
        expect(grid.at(2)).toBeUndefined()
      })
    })
    describe('with a grid with values', () => {
      it ('returns the string at the specified index', () => {
        grid.setAt(2, 'd')
        grid.setAt(3, 'o')
        grid.setAt(4, 'g')
        expect(grid.at(2)).toEqual('d')
        expect(grid.at(3)).toEqual('o')
        expect(grid.at(4)).toEqual('g')
      })
    })
  })

  describe('#setAt', () => {
    it('sets the string at the specified index', () => {
      grid.setAt(2, 'd')
      expect(grid.at(2)).toEqual('d')
    })
  })

  describe('clone', () => {
    it('returns a copy of the grid', () => {
      const clone = grid.clone()
      expect(clone).toEqual(grid)
      expect(clone).not.toBe(grid)
    })
  })

  describe('fill', () => {
    it('populates all undefined positions with a string', () => {
      grid.fill()
      for (var i = 0; i < grid.size; i++) {
        expect(grid.at(i)).toBeDefined()
        expect(grid.at(i)).toEqual(expect.any(String))
      }
    })
  })
})
