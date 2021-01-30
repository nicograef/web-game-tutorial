import InputHandler from './InputHandler'
import Ball from './Ball'
import Paddle from './Paddle'

export default class Game {
  private paddle: Paddle
  private ball: Ball

  private inputHandler: InputHandler

  private context: CanvasRenderingContext2D
  public width: number
  public height: number

  private lastTimestamp = 0

  constructor(canvas: HTMLCanvasElement) {
    this.context = canvas.getContext('2d')!
    this.height = canvas.height
    this.width = canvas.width

    this.paddle = new Paddle(this)
    this.ball = new Ball(this)

    this.inputHandler = new InputHandler({
      arrowLeftPressed: () => this.paddle.moveLeft(),
      arrowLeftReleased: () => this.paddle.stop('left'),
      arrowRightPressed: () => this.paddle.moveRight(),
      arrowRightReleased: () => this.paddle.stop('right'),
    })

    this.inputHandler.setupAllListeners()

    this.loop(1)
  }

  private restart() {
    this.paddle = new Paddle(this)
    this.ball = new Ball(this)
    // this.inputHandler.setupAllListeners()
    this.loop(1)
  }

  private stop() {
    // this.inputHandler.cleanupAllListeners()
    setTimeout(this.restart.bind(this), 1000)
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

    if (this.hasBallFallenThrough()) {
      this.stop()
      return
    }

    window.requestAnimationFrame(this.loop.bind(this))
  }

  private isBallOnPaddle(): boolean {
    return (
      this.ball.x >= this.paddle.x &&
      this.ball.x <= this.paddle.x + this.paddle.width &&
      this.ball.y + this.ball.radius >= this.paddle.y
    )
  }

  private hasBallFallenThrough(): boolean {
    return this.ball.y - this.ball.radius >= this.height
  }
}
