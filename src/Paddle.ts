import Game from './Game'

type IPaddleDirection = 'left' | 'right' | null
type IPaddlePosition = 'bottom' | 'top'

export default class Paddle {
  public width = 150
  public height = 25
  private padding = 5
  private speed = 80
  public x
  public y
  private direction: IPaddleDirection

  constructor(private game: Game, position: IPaddlePosition = 'bottom') {
    this.direction = null
    this.x = (this.game.width - this.width) / 2
    if (position === 'bottom') this.y = this.game.height - this.height - this.padding
    else if (position === 'top') this.y = this.padding
    else throw new Error('Paddle Position required')
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
