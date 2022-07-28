
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

function angleTo(v1, v2) {
  return Math.atan2((v2.y - v1.y), (v2.x - v1.x))
}

class Mob {
  acceleration = 0.1
  currentSpeed = 0
  speed = 5

  constructor(element, xx = 0, yy = 0) {
    this.element = element

    this.pos = new V2(xx, yy)
    this.goalPos = V2.from(this.pos)
    this.updateElement()
  }

  update() {
    if (distance(this.pos, this.goalPos) > speed) {
      if (this.currentSpeed < this.speed) {
        this.currentSpeed = Math.min(this.speed, this.currentSpeed += this.acceleration)
      }

      let angle = angleTo(this.pos, this.goalPos)

      this.pos.x += Math.cos(angle) * this.currentSpeed
      this.pos.y += Math.sin(angle) * this.currentSpeed
      this.updateElement()

    } else {
      this.currentSpeed = 0
    }
  }

  updateElement() {
    this.element.style.transform = "translate(" + (this.pos.x) + "px," + (this.pos.y) + "px)";
  }
}