import Game from './Game'

export default class Ball {
  public radius = 10
  private speed = 80
  public x
  public y
  private vx = 1
  public vy = -1

  constructor(private game: Game) {
    this.x = (this.game.width - this.radius) / 2
    this.y = (this.game.height - this.radius) / 2
  }

  public update(deltaTime: number) {
    this.x += (this.vx * this.speed) / deltaTime
    this.y += (this.vy * this.speed) / deltaTime

    // left border
    if (this.x - this.radius < 0) {
      this.x = this.radius
      this.vx = -this.vx
    }

    // right border
    if (this.x + this.radius > this.game.width) {
      this.x = this.game.width - this.radius
      this.vx = -this.vx
    }

    // top border
    if (this.y < 0 + this.radius) {
      this.y = this.radius
      this.vy = -this.vy
    }

    // bottom border
    if (this.y > this.game.height - this.radius) {
      // this.y = this.game.height - this.radius
      // this.vy = -this.vy
    }
  }

  public draw(context: CanvasRenderingContext2D) {
    const { x, y, radius } = this
    context.beginPath()
    context.arc(x, y, radius, 0, 2 * Math.PI)
    context.fill()
    context.closePath()
  }
}
