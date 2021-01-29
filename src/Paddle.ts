export default class Paddle {
  public width = 150
  public height = 25
  private padding = 5
  private speed = 50
  public x
  public y
  private direction: 'left' | 'right' | null

  constructor(private gameWidth: number, private gameHeight: number) {
    this.x = (this.gameWidth - this.width) / 2
    this.y = this.gameHeight - this.height - this.padding
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
    if (this.direction === null) return
    else if (this.direction === 'left') this.x -= this.speed / deltaTime
    else if (this.direction === 'right') this.x += this.speed / deltaTime

    // left border
    if (this.x < 0 + this.padding) {
      this.x = this.padding
    }

    // right border
    if (this.x + this.width > this.gameWidth - this.padding) {
      this.x = this.gameWidth - this.width - this.padding
    }
  }

  public draw(context: CanvasRenderingContext2D) {
    const { x, y, width, height } = this
    context.fillRect(x, y, width, height)
  }
}
