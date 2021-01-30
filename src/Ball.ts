import Game from './Game'

export default class Ball {
  public radius = 10
  public x: number
  public y: number
  public vx: number
  public vy: number

  constructor(private game: Game) {
    // start from middle of playground
    this.x = (this.game.width - this.radius) / 2
    this.y = (this.game.height - this.radius) / 2

    // randomize speed in x and y direction
    this.vx = Math.floor(Math.random() * 40) + 20
    this.vy = Math.floor(Math.random() * 40) + 20

    // randomize direction by inverting speed
    if (Math.random() > 0.5) this.vx = -this.vx
    if (Math.random() > 0.5) this.vy = -this.vy
  }

  public update(deltaTime: number) {
    this.x += this.vx / deltaTime
    this.y += this.vy / deltaTime

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
      // this.y = this.radius
      // this.vy = -this.vy
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
