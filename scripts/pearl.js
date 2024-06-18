const pearlImage = new Image()
pearlImage.src = "../assets/pearl.png"

export default class Pearl {
  constructor(x, y, pearlImage) {
    this.x = x
    this.y = y
    this.image = pearlImage
    this.spriteWidth = 100
    this.spriteHeight = 100
  }

  update(context, gameState) {
    if (gameState !== "paused") {
      this.move()
      this.draw(context)
    }
  }

  move() {
    this.x = this.x - 4
  }

  draw(context) {
    context.drawImage(
      this.image,
      this.x,
      this.y,
      this.spriteWidth,
      this.spriteHeight
    )
  }
}
