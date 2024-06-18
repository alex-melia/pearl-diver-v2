export function toggleScreen(id, toggle) {
  let element = document.getElementById(id)
  let display = toggle ? "flex" : "none"
  element.style.display = display
}

export function checkCollision(diver, pearl) {
  return (
    diver.x < pearl.x &&
    diver.x + 400 >= pearl.x &&
    diver.y < pearl.y &&
    diver.y + diver.spriteHeight >= pearl.y
  )
}
