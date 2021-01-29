import InputHandler from './InputHandler'
import Ball from './Ball'
import Paddle from './Paddle'

const GAME_WIDTH = 900
const GAME_HEIGHT = 600

const canvas = document.querySelector<HTMLCanvasElement>('#screen')!
const context = canvas.getContext('2d')!

const paddle = new Paddle(GAME_WIDTH, GAME_HEIGHT)
const ball = new Ball(GAME_WIDTH, GAME_HEIGHT)

new InputHandler({
  arrowLeftPressed: () => paddle.moveLeft(),
  arrowLeftReleased: () => paddle.stopLeft(),
  arrowRightPressed: () => paddle.moveRight(),
  arrowRightReleased: () => paddle.stopRight(),
})

let lastTime = 0
function gameLoop(timestamp: DOMHighResTimeStamp) {
  let deltaTime = timestamp - lastTime
  lastTime = timestamp

  context.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT)

  paddle.update(deltaTime)
  paddle.draw(context)

  ball.update(deltaTime)
  ball.draw(context)

  window.requestAnimationFrame(gameLoop)

}

gameLoop(1)
