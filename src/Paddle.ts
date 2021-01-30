import Game from './Game'

type IPaddleDirection = 'left' | 'right' | null

export default class Paddle {
  public width = 150
  public height = 25
  private padding = 5
  private speed = 80
  public x
  public y
  private direction: IPaddleDirection

  constructor(private game: Game) {
    this.x = (this.game.width - this.width) / 2
    this.y = this.game.height - this.height - this.padding
    this.direction = null
  }

  public moveLeft() {
    this.direction = 'left'
  }

  public moveRight() {
    this.direction = 'right'
  }

  public stop(direction: IPaddleDirection = null) {
    if (this.direction === direction || direction === null) this.direction = null
  }

  public update(deltaTime: number) {
    if (this.direction === null) return
    else if (this.direction === 'left') this.x -= this.speed / deltaTime
    else if (this.direction === 'right') this.x += this.speed / deltaTime

    // left border
    if (this.x < 0 + this.padding) {
      this.x = this.padding
    }

    // right border
    if (this.x + this.width > this.game.width - this.padding) {
      this.x = this.game.width - this.width - this.padding
    }
  }

  public draw(context: CanvasRenderingContext2D) {
    const { x, y, width, height } = this
    context.fillRect(x, y, width, height)
  }
}
