export const movements = {
  LEFT: 0,
  RIGHT: 1,
  UP: 2,
  DOWN: 3,
}
class Movement {
  constructor(movement) {
    this.movement = movement
  }
}
export class MovingLeft extends Movement {
  constructor(diver) {
    super("LEFT")
    this.diver = diver
  }
  enter() {
    this.diver.x = this.diver.x - 5
  }
  handleInput(input) {
    if (input === "PRESS left") this.diver.setMovement(movements.LEFT)
    if (input === "PRESS right") this.diver.setMovement(movements.RIGHT)
    if (input === "PRESS up") this.diver.setMovement(movements.UP)
    if (input === "PRESS down") this.diver.setMovement(movements.DOWN)
  }
}
export class MovingRight extends Movement {
  constructor(diver) {
    super("RIGHT")
    this.diver = diver
  }
  enter() {
    this.diver.x = this.diver.x + 5
  }
  handleInput(input) {
    if (input === "PRESS left") this.diver.setMovement(movements.LEFT)
    if (input === "PRESS right") this.diver.setMovement(movements.RIGHT)
    if (input === "PRESS up") this.diver.setMovement(movements.UP)
    if (input === "PRESS down") this.diver.setMovement(movements.DOWN)
  }
}
export class MovingUp extends Movement {
  constructor(diver) {
    super("UP")
    this.diver = diver
  }
  enter() {
    this.diver.y = this.diver.y - 5
  }
  handleInput(input) {
    if (input === "PRESS left") this.diver.setMovement(movements.LEFT)
    if (input === "PRESS right") this.diver.setMovement(movements.RIGHT)
    if (input === "PRESS up") this.diver.setMovement(movements.UP)
    if (input === "PRESS down") this.diver.setMovement(movements.DOWN)
  }
}
export class MovingDown extends Movement {
  constructor(diver) {
    super("DOWN")
    this.diver = diver
  }
  enter() {
    this.diver.y = this.diver.y + 5
  }
  handleInput(input) {
    if (input === "PRESS left") this.diver.setMovement(movements.LEFT)
    if (input === "PRESS right") this.diver.setMovement(movements.RIGHT)
    if (input === "PRESS up") this.diver.setMovement(movements.UP)
    if (input === "PRESS down") this.diver.setMovement(movements.DOWN)
  }
}
