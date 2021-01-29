import InputHandler from './InputHandler'
import Ball from './Ball'
import Paddle from './Paddle'

// const GAME_WIDTH = 900
// const GAME_HEIGHT = 600

export default class Game {
  private paddle: Paddle
  private ball: Ball

  private context: CanvasRenderingContext2D
  private width: number
  private height: number

  private lastTimestamp = 0

  constructor(canvas: HTMLCanvasElement) {
    this.context = canvas.getContext('2d')!
    this.height = canvas.height
    this.width = canvas.width

    this.paddle = new Paddle(this.width, this.height)
    this.ball = new Ball(this.width, this.height)

    new InputHandler({
      arrowLeftPressed: () => this.paddle.moveLeft(),
      arrowLeftReleased: () => this.paddle.stopLeft(),
      arrowRightPressed: () => this.paddle.moveRight(),
      arrowRightReleased: () => this.paddle.stopRight(),
    })

    this.loop(1)
  }

  private update(deltaTime: number) {
    this.paddle.update(deltaTime)
    this.ball.update(deltaTime)

    if (this.isBallOnPaddle()) {
      this.ball.vy = -1
    }
  }

  private draw() {
    this.ball.draw(this.context)
    this.paddle.draw(this.context)
  }

  private clear() {
    this.context.clearRect(0, 0, this.width, this.height)
  }

  private loop(timestamp: DOMHighResTimeStamp) {
    const deltaTime = timestamp - this.lastTimestamp
    this.lastTimestamp = timestamp

    this.clear()
    this.update(deltaTime)
    this.draw()

    window.requestAnimationFrame(this.loop.bind(this))
  }

  private isBallOnPaddle(): boolean {
    return (
      this.ball.x >= this.paddle.x &&
      this.ball.x <= this.paddle.x + this.paddle.width &&
      this.ball.y + this.ball.radius >= this.paddle.y
    )
  }
}
