
function lerp(a, b, t) {
  t = Math.max(0, Math.min(1, t))
  return (1 - t) * a + t * b;
}

function easeRange(input) {
  return Math.pow(input, 2) / (Math.pow(input, 2) + Math.pow(1 - input, 2))
}

function spawnParticle(templateElement, x, y, inContainer = true) {
  let h = templateElement.cloneNode(true)
  h.style.display = 'initial'
  if (inContainer) {
    column.appendChild(h)
  } else {
    document.querySelector('body').appendChild(h)
  }
  let p = new Particle(h, x, y)
  particles.push(p)
  return p
}

function unlikelyMiddleRandom() {
  let val = 0
  while (true) {
    val = Math.random()
    if (val > 0.33 && val < 0.66) {
      if (Math.random() > 0.99) {
        break
      }
    } else {
      break
    }
  }
  return val
}

let column;
let leftGuy;
let rightGuy;
let heartTemplates;
let miscTemplates;

let miscParticleTimer = 10

let particles = []

class Particle {
  speed = 1.4
  rota = 0
  dead = false // should be removed from array?
  falling = false

  constructor(domElement, xx, yy) {
    this.x = xx
    this.y = yy
    this.domElement = domElement
    this.rota = Math.random() * 310
  }

  update() {
    if (this.dead) return

    if (this.falling) {
      this.y += this.speed
    } else {
      this.y -= this.speed
    }
    this.rota += 0.04
    let offsetX = this.x + Math.sin(this.rota) * 15
    this.domElement.style.top = `${this.y}px`
    this.domElement.style.left = `${offsetX}px`


    if (!this.falling && this.y < -550 || this.falling && (this.y > window.visualViewport.height + 400)) {
      this.domElement.remove()
      console.log('particle died')
      this.dead = true
    }
  }
}


function load() {
  let duplicationTargets = document.querySelectorAll('[data-duplicate]')

  duplicationTargets.forEach(el => {
    let x = parseInt(el.getAttribute('data-duplicate'))

    for (let i = 0; i < x; i++) {
      let duplicate = el.cloneNode(true)

      duplicate.style.animationDelay = `-${(i + 1) / 2}s`
      el.parentElement.insertBefore(duplicate, el.nextSibling)
    }
  })


  column = document.querySelector('#column')
  leftGuy = document.querySelector('#left-guy')
  rightGuy = document.querySelector('#right-guy')

  heartTemplates = Array.from(document.querySelectorAll('.heart-particle'))
  miscTemplates = Array.from(document.querySelectorAll('.misc-particle'))

  // console.log(heartTemplates)
  document.addEventListener('click', function (e) {
    e.pageX
  })

  requestAnimationFrame(frame)
  addMiscParticle()
}

function addMiscParticle() {
  // console.log('spawning misc particle')


  let xPos = unlikelyMiddleRandom() * window.visualViewport.width - 30

  let yPos = -200
  let particle = miscTemplates[Math.floor(Math.random() * miscTemplates.length)]
  let p = spawnParticle(particle, xPos, yPos, false)
  p.falling = true
  p.speed *= lerp(0.8, 1.4, Math.random())
  p.update()
}



let kissPosition = 0; // 0 is far, 1 is kissing
let kissDirection = 1; // 1 or -1
let speed = 0.01;

function frame() {

  requestAnimationFrame(frame)

  kissPosition += kissDirection * speed
  if (kissPosition > 1) {
    if (kissDirection == 1) {
      kissDirection = -1
      let particle = heartTemplates[Math.floor(Math.random() * heartTemplates.length)]
      spawnParticle(particle, 330, 250)
    }
  } else if (kissPosition <= 0) {
    kissDirection = 1
  }


  leftGuy.style.left = `${lerp(-50, 100, easeRange(kissPosition))}px`
  rightGuy.style.left = `${lerp(450, 330, easeRange(kissPosition))}px`

  for (let i = particles.length - 1; i >= 0; i--) {
    if (particles[i].dead) {
      particles.splice(i, 1)
      // console.log('particle removed from array')
      continue
    }
    particles[i].update()
  }

  miscParticleTimer -= 1
  if (miscParticleTimer <= 0) {
    addMiscParticle()
    miscParticleTimer = Math.random() * 30 + 30
  }

}

window.addEventListener('load', load)