export class Grid {
  constructor(length=7, grid=null) {
    this.length = length
    this.grid = grid || new Array(this.length * this.length)
  }

  get size() {
    return this.grid.length
  }

  index(rowIndex, columnIndex) {
    if(!!columnIndex) {
      return rowIndex * this.length + columnIndex
    }
    else {
      return rowIndex
    }
  }

  row(position) {
    return Math.trunc(position / 7)
  }

  column(position) {
    return position % 7
  }

  at(position) {
    return this.grid[position]
  }

  setAt(position, value) {
    this.grid[position] = value
  }

  clone() {
    return new Grid(this.length, this.grid)
  }

  fill() {
    const letters = 'abcdefghijklmnopqrstuvwxyz'.split('')
    for (var i = 0; i < this.size; i++ ) {
      if (!this.grid[i]) {
        this.grid[i] = letters[Math.floor((Math.random()*letters.length))]
      }
    }
  }

  print() {
    return this.grid
  }
}