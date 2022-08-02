

let items = [] // array of dom elements

// Fisher–Yates knuth shuffle
function shuffle(array) {
  let currentIndex = array.length, randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}


// the objects, with width height from DOM and then a position we set :)
class Toy {
  constructor(domElement) {
    this.domElement = domElement
    this.domElement.style.position = 'absolute'

    this.x = window.visualViewport.width / 2 + 200 - Math.random() * 400
    this.y = window.visualViewport.height / 2 + 200 - Math.random() * 400

    this.visualX = this.x
    this.visualY = this.y

    this.updateSize()
    this.updatePosition()

  }

  updatePosition() {
    this.visualX += (this.x - this.visualX) * 0.1
    this.visualY += (this.y - this.visualY) * 0.1
    this.domElement.style.left = `${this.x}px`
    this.domElement.style.top = `${this.y}px`
  }

  updateSize() {
    this.width = this.domElement.clientWidth;
    if (this.width == 0 || this.width == undefined) {
      console.error('no size for element yet')
    }
    this.height = this.domElement.clientHeight;
    if (this.width < 65 || this.height < 65) {
      this.domElement.style['z-index'] = '20'
    }
    this.domElement.style.marginLeft = `${-this.width / 2}px`
    this.domElement.style.marginTop = `${-this.height / 2}px`
    // this.domElement.style.transform = `translate(${-this.width / 2}px, ${-this.height / 2}px)`
  }

  pointOverlaps(xx, yy) {
    return (xx > this.x - this.width / 2 &&
      xx < this.x + this.width / 2 &&
      yy > this.y - this.height / 2 &&
      yy < this.y + this.height / 2)
  }

  toyOverlaps(otherToy) {
    const corners = [
      [otherToy.x - otherToy.width / 2, otherToy.y - otherToy.height / 2],
      [otherToy.x + otherToy.width / 2, otherToy.y - otherToy.height / 2],
      [otherToy.x - otherToy.height / 2, otherToy.y + otherToy.height / 2],
      [otherToy.x + otherToy.width / 2, otherToy.y + otherToy.height / 2]
    ]

    // check if the other toys corners are inside our rect
    for (let i = 0; i < corners.length; i++) {

      let pair = corners[i]
      if (this.pointOverlaps(pair[0], pair[1])) {
        return true
      }
    }

    // edge case, where we are fit entirely inside the other rect, so check one of our points on them
    return otherToy.pointOverlaps(this.x, this.y)
  }

  getPushed(otherToy, distance = 2) {
    let centerX = this.x
    let centerY = this.y

    let otherCenterX = otherToy.x
    let otherCenterY = otherToy.y

    let angle = Math.atan2(centerY - otherCenterY, centerX - otherCenterX)

    let finalStrength = distance
    if ((otherToy.width + otherToy.height) > (this.width + this.height)) {
      finalStrength *= 3
    }

    this.x += Math.cos(angle) * finalStrength
    this.y += Math.sin(angle) * finalStrength
    this.updatePosition()
  }
}

document.addEventListener("DOMContentLoaded", init)

function init() {
  let container = document.querySelector('#toybox')
  let nodes = Array.from(container.childNodes)
  nodes = nodes.filter(node => node.nodeType == 1)
  nodes = shuffle(nodes) // help prevent biases

  for (let i = 0; i < nodes.length; i++) {
    items.push(new Toy(nodes[i]));
  }
  requestAnimationFrame(main)
}

function main() {
  items = shuffle(items)

  items.map(item => item.updateSize())

  for (let i = 0; i < items.length; i++) {
    const itemA = items[i]

    for (let k = 0; k < items.length; k++) {
      if (i == k) continue;

      const itemB = items[k];
      if (itemA.toyOverlaps(itemB)) {
        itemB.getPushed(itemA)
      }
    }

  }

  for (let i = 0; i < items.length; i++) {
    const itemA = items[i]
    if (itemA.x - (itemA.width / 2) < 0) {
      itemA.x += 10
      itemA.updatePosition()
    }
    if (itemA.y - (itemA.height / 2) < 0) {
      itemA.y += 10
      itemA.updatePosition()
    }
    if (itemA.x + (itemA.width / 2) > window.visualViewport.width) {
      itemA.x -= 10
      itemA.updatePosition()
    }

  }


  requestAnimationFrame(main)
}