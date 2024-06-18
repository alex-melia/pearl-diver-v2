import { MovingLeft, MovingRight, MovingUp, MovingDown } from "./movement.js"

export default class Diver {
  constructor(gameWidth, gameHeight, image) {
    this.gameWidth = gameWidth
    this.gameHeight = gameHeight
    this.movements = [
      new MovingLeft(this),
      new MovingRight(this),
      new MovingUp(this),
      new MovingDown(this),
    ]
    this.currentMovement = this.movements[0]
    this.image = image
    this.width = 50
    this.height = 50
    this.spriteWidth = 250
    this.spriteHeight = 126
    this.x = gameWidth / 2 - this.spriteWidth
    this.y = gameHeight / 2 - this.spriteHeight
    this.frameX = 0
    this.frameY = 0
    this.gameFrame = 0
    this.staggerFrames = 20
  }
  draw(context) {
    context.drawImage(
      this.image,
      this.frameX * this.spriteWidth,
      this.frameY * this.spriteHeight,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.gameWidth / 6,
      this.gameHeight / 6
    )
    if (this.gameFrame % this.staggerFrames === 0) {
      if (this.frameX === 3) {
        this.frameX = 0
        this.frameY++
      } else {
        this.frameX++
      }
    }
    if (this.frameY === 2 && this.frameX === 1) {
      this.frameY = 0
      this.frameX = 0
    }
    this.gameFrame++
  }
  update(input, gameState) {
    if (gameState !== "paused") {
      this.currentMovement.handleInput(input)

      this.x = Math.max(0, Math.min(this.gameWidth - 500, this.x))
      this.y = Math.max(
        0,
        Math.min(this.gameHeight - this.spriteHeight, this.y)
      )
    }
  }
  setMovement(movement) {
    this.currentMovement = this.movements[movement]
    this.currentMovement.enter()
  }
}
