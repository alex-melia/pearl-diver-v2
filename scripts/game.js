import Diver from "./diver.js"
import Pearl from "./pearl.js"
import InputHelper from "./input.js"
import { toggleScreen, checkCollision } from "./utils.js"
import Mine from "./mine.js"

const canvas = document.getElementById("gameCanvas")
const ctx = canvas.getContext("2d")
canvas.width = window.outerWidth
canvas.height = window.outerHeight

const diverImage = new Image()
const pearlImage = new Image()
const mineImage = new Image()
const backgroundImage = new Image()

diverImage.src = "../assets/dsprites.png"
pearlImage.src = "../assets/pearl.png"
mineImage.src = "../assets/mine.png"
backgroundImage.src = "../assets/background.png"

class Game {
  constructor(canvas) {
    this.canvas = canvas
    this.width = this.canvas.width
    this.height = this.canvas.height
    this.diver = new Diver(this.width, this.height, diverImage)
    this.state = null
    this.input = new InputHelper()
    this.pearlList = []
    this.mineList = []
    this.score = 0
    this.highscore = 0
    this.lives = 3
    this.createPearlInterval = null
    this.createMineInterval = null
  }
  render(context) {
    game.diver.update(game.input.lastKey, game.state)
    this.diver.draw(context)
  }
  startGame() {
    animate()

    clearInterval(this.createPearlInterval)
    clearInterval(this.createMineInterval)
    displayLives(this.lives)

    this.createPearlInterval = setInterval(() => {
      if (this.state === "playing") {
        this.pearlList.push(
          new Pearl(
            this.width,
            Math.floor(Math.random() * this.height),
            pearlImage
          )
        )
      }
    }, 2000)
    this.createMineInterval = setInterval(() => {
      if (this.state === "playing") {
        this.mineList.push(
          new Mine(
            this.width,
            Math.floor(Math.random() * this.height),
            mineImage
          )
        )
      }
    }, 1000)

    if (this.state === "paused") {
      this.diver.pause()
      clearInterval(this.createPearlInterval)
      clearInterval(this.createMineInterval)
    }

    if (this.state === "dead") {
      clearInterval(this.createPearlInterval)
      clearInterval(this.createMineInterval)
    }
  }
  pause() {
    this.state = "paused"
    toggleScreen("pause-screen", true)
  }
  resume() {
    this.state = "playing"
    toggleScreen("pause-screen", false)
  }
}

const game = new Game(canvas)

game.canvas.style.background = "url('../assets/background.png')"
game.canvas.style.backgroundSize = "cover"

function updateState() {
  switch (game.state) {
    case "playing":
      game.startGame()
      game.canvas.style.background = "url('../assets/background.png')"
      game.canvas.style.backgroundSize = "cover"
      break
    case "dead":
      let scoreElement = document.getElementById("death-score")
      scoreElement.innerText = game.score
      toggleScreen("death-screen", true)
    default:
      game.startGame()
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  if (game.state === "dead") {
    return
  }

  for (let i = 0; i < game.pearlList.length; i++) {
    let currentPearl = game.pearlList[i]
    currentPearl.update(ctx, game.state)

    if (checkCollision(game.diver, currentPearl)) {
      game.pearlList.splice(i, 1)
      i--
      game.score++
      displayScore(game.score)
    } else {
      currentPearl.draw(ctx)
    }

    if (currentPearl.x <= 0) {
      game.pearlList.splice(i, 1)
      i--
    }
  }

  for (let i = 0; i < game.mineList.length; i++) {
    let currentMine = game.mineList[i]
    currentMine.update(ctx, game.state)

    if (checkCollision(game.diver, currentMine)) {
      game.mineList.splice(i, 1)
      i--
      game.lives--
      displayLives(game.lives)
      if (game.lives === 0) {
        game.state = "dead"
        updateState()
        updateHighscore(game.score)
      }
    } else {
      currentMine.draw(ctx)
    }

    if (currentMine.x <= 0) {
      game.mineList.splice(i, 1)
      i--
    }
  }

  game.render(ctx)
  requestAnimationFrame(animate)
}

function displayLives(lives) {
  let livesElement = document.getElementById("lives")
  livesElement.innerText = lives
}

function displayScore(score) {
  let scoreElement = document.getElementById("game-score")
  scoreElement.innerText = score
}

function updateHighscore(score) {
  if (score >= game.highscore) {
    let hiScoreElement = document.getElementById("death-highscore")
    hiScoreElement.innerText = score
    game.highscore = score
  }
}

window.startGame = function () {
  game.state = "playing"
  toggleScreen("start-screen", false)
  toggleScreen("game-stats", true)
  updateState()

  let scoreElement = document.getElementById("game-score")
  scoreElement.innerText = game.score
}

window.restartGame = function () {
  game.state = "playing"
  toggleScreen("death-screen", false)
  game.lives = 3
  game.score = 0
  game.pearlList = []
  game.mineList = []
  let scoreElement = document.getElementById("game-score")
  scoreElement.innerText = game.score

  game.diver.x = game.width / 2 - game.diver.spriteWidth
  game.diver.y = game.height / 2 - game.diver.spriteHeight
  game.diver.frameX = 0
  game.diver.frameY = 0
  game.diver.gameFrame = 0
  updateState()
}

window.pauseGame = function () {
  game.pause()
}

window.resumeGame = function () {
  game.resume()
}
