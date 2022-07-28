
class V2 {
  constructor(xx = 0, yy = 0) {
    this.x = xx
    this.y = yy
  }

  static from(inputVector) {
    return new V2(inputVector.x, inputVector.y)
  }
}

function distance(v1, v2) {
  return Math.sqrt(Math.pow(Math.abs(v1.x - v2.x), 2) + Math.pow(Math.abs(v1.y - v2.y), 2))
}