console.log('hello world')

mainCharacter = document.getElementById('main-character')

let charPos = new V2(90, 40)

let speed = 3

let goalPos = V2.from(charPos)


window.addEventListener('click', function (e) {

  goalPos.x = e.pageX
  goalPos.y = e.pageY
})


requestAnimationFrame(draw)


function draw() {
  if (distance(charPos, goalPos) > 10) {
    charPos.x += Math.sign(goalPos.x - charPos.x) * speed
    charPos.y += Math.sign(goalPos.y - charPos.y) * speed
  }
  mainCharacter.style.transform = "translate(" + (charPos.x) + "px," + (charPos.y) + "px)";
  requestAnimationFrame(draw)
}
