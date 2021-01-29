export default class Paddle {
  public radius = 10
  private padding = 1
  private speed = 50
  public x
  public y
  private vx = 1
  public vy = -1
  private direction: 'left' | 'right' | null

  constructor(private gameWidth: number, private gameHeight: number) {
    this.x = (this.gameWidth - this.radius) / 2
    this.y = (this.gameHeight - this.radius - this.padding) / 2
    this.direction = null
  }

  public moveLeft() {
    this.direction = 'left'
  }

  public stopLeft() {
    if (this.direction !== 'left') return
    this.direction = null
  }

  public moveRight() {
    this.direction = 'right'
  }

  public stopRight() {
    if (this.direction !== 'right') return
    this.direction = null
  }

  public stop() {
    this.direction = null
  }

  public update(deltaTime: number) {
    this.x += (this.vx * this.speed) / deltaTime
    this.y += (this.vy * this.speed) / deltaTime

    if (this.x < 0 + this.radius + this.padding) {
      this.x = this.radius + this.padding
      this.vx = -this.vx
    }
    if (this.x + this.radius > this.gameWidth - this.padding) {
      this.x = this.gameWidth - this.radius - this.padding
      this.vx = -this.vx
    }

    if (this.y < 0 + this.radius + this.padding) {
      this.y = this.radius + this.padding
      this.vy = -this.vy
    }
    if (this.y > this.gameHeight - this.radius - this.padding) {
      this.y = this.gameHeight - this.radius - this.padding
      this.vy = -this.vy
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
