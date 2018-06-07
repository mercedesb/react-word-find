export class Grid {
  constructor(grid=null) {
    this.grid = grid || new Array(this.rows * this.columns)
  }

  get size() {
    return this.grid.length
  }

  get rows() {
    return 7
  }

  get columns() {
    return 7
  }
  
  index(rowIndex, columnIndex) {
    if(!!columnIndex) {
      return rowIndex * this.columns + columnIndex
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
    return new Grid(this.grid)
  }

  fill() {
    const letters = 'abcdefghijklmnopqrstuvwxyz'.split('')
    for (var i = 0; i < this.size; i++ ) {
      if (!this.grid[i]) {
        this.grid[i] = letters[Math.floor((Math.random()*letters.length))]
      }
    }
  }
}