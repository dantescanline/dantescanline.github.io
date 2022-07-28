console.log('hello world')

mainCharacterElement = document.getElementById('main-character')

let charPos = new V2(90, 40)

let speed = 3

// let goalPos = V2.from(charPos)

let mainChar = new Mob(mainCharacterElement, 80, 150)

window.addEventListener('click', function (e) {

  // goalPos.x = e.pageX
  // goalPos.y = e.pageY
  mainChar.goalPos.x = e.pageX
  mainChar.goalPos.y = e.pageY
})


let mobs = []
mobs.push(mainChar)

requestAnimationFrame(draw)


function draw() {
  mobs.map(mob => mob.update())
  // mainChar.update()
  // if (distance(charPos, goalPos) > 10) {
  //   charPos.x += Math.sign(goalPos.x - charPos.x) * speed
  //   charPos.y += Math.sign(goalPos.y - charPos.y) * speed
  // }
  // mainCharacter.style.transform = "translate(" + (charPos.x) + "px," + (charPos.y) + "px)";
  requestAnimationFrame(draw)
}
