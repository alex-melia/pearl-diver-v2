const mineImage = new Image()
mineImage.src = "../assets/mine.png"

export default class Mine {
  constructor(x, y, mineImage) {
    this.x = x
    this.y = y
    this.image = mineImage
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
