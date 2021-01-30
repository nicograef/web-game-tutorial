import InputHandler from './InputHandler'
import Ball from './Ball'
import Paddle from './Paddle'

export default class Game {
  private paddleBottom: Paddle
  private paddleTop: Paddle
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

    this.paddleBottom = new Paddle(this, 'bottom')
    this.paddleTop = new Paddle(this, 'top')
    this.ball = new Ball(this)

    this.inputHandler = new InputHandler({
      arrowLeftPressed: () => this.paddleBottom.moveLeft(),
      arrowLeftReleased: () => this.paddleBottom.stop('left'),
      arrowRightPressed: () => this.paddleBottom.moveRight(),
      arrowRightReleased: () => this.paddleBottom.stop('right'),
      keyAPressed: () => this.paddleTop.moveLeft(),
      keyAReleased: () => this.paddleTop.stop('left'),
      keyDPressed: () => this.paddleTop.moveRight(),
      keyDReleased: () => this.paddleTop.stop('right'),
    })

    this.inputHandler.setupAllListeners()

    this.loop(1)
  }

  private restart() {
    this.paddleBottom = new Paddle(this)
    this.ball = new Ball(this)
    // this.inputHandler.setupAllListeners()
    this.loop(1)
  }

  private stop() {
    // this.inputHandler.cleanupAllListeners()
    setTimeout(this.restart.bind(this), 1000)
  }

  private update(deltaTime: number) {
    this.paddleBottom.update(deltaTime)
    this.paddleTop.update(deltaTime)
    this.ball.update(deltaTime)
  }

  private draw() {
    this.ball.draw(this.context)
    this.paddleBottom.draw(this.context)
    this.paddleTop.draw(this.context)
  }

  private clear() {
    this.context.clearRect(0, 0, this.width, this.height)
  }

  private loop(timestamp: DOMHighResTimeStamp) {
    const deltaTime = timestamp - this.lastTimestamp
    this.lastTimestamp = timestamp

    this.clear()
    this.update(deltaTime)
    this.handleCollisions()
    this.draw()

    if (this.checkEndOfGame()) {
      this.stop()
      return
    }

    window.requestAnimationFrame(this.loop.bind(this))
  }

  private handleCollisions() {
    if (this.isBallOnPaddleBottom()) {
      this.ball.vy = -Math.abs(this.ball.vy) - 1
      this.ball.vx ? this.ball.vx++ : this.ball.vx--
    } else if (this.isBallOnPaddleTop()) {
      this.ball.vy = Math.abs(this.ball.vy) + 1
      this.ball.vx ? this.ball.vx++ : this.ball.vx--
    }
  }

  private checkEndOfGame() {
    return this.hasBallFallenThroughBottom() || this.hasBallFallenThroughTop()
  }

  private isBallOnPaddleBottom(): boolean {
    return (
      this.ball.x >= this.paddleBottom.x &&
      this.ball.x <= this.paddleBottom.x + this.paddleBottom.width &&
      this.ball.y + this.ball.radius >= this.paddleBottom.y
    )
  }

  private isBallOnPaddleTop(): boolean {
    return (
      this.ball.x >= this.paddleTop.x &&
      this.ball.x <= this.paddleTop.x + this.paddleTop.width &&
      this.ball.y - this.ball.radius <= this.paddleTop.y + this.paddleTop.height
    )
  }

  private hasBallFallenThroughBottom(): boolean {
    return this.ball.y - this.ball.radius >= this.height
  }

  private hasBallFallenThroughTop(): boolean {
    return this.ball.y + this.ball.radius <= 0
  }
}
