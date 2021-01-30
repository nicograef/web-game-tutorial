import { KEYS } from './enums'

interface IInputHandlers {
  arrowLeftPressed: () => void
  arrowLeftReleased: () => void
  arrowRightPressed: () => void
  arrowRightReleased: () => void
}

export default class InputHandler {
  private onKeyDown: (keyEvent: KeyboardEvent) => void
  private onKeyUp: (keyEvent: KeyboardEvent) => void

  constructor(private handlers: IInputHandlers) {
    this.onKeyDown = this.keyDownListener.bind(this)
    this.onKeyUp = this.keyUpListener.bind(this)
  }

  public setupAllListeners() {
    document.addEventListener('keydown', this.onKeyDown)
    document.addEventListener('keyup', this.onKeyUp)
    return this.cleanupAllListeners
  }

  public cleanupAllListeners() {
    document.removeEventListener('keydown', this.onKeyDown)
    document.removeEventListener('keyup', this.onKeyUp)
  }

  private keyDownListener(keyEvent: KeyboardEvent) {
    if (keyEvent.code === KEYS.LEFT) this.handlers.arrowLeftPressed()
    else if (keyEvent.code === KEYS.RIGHT) this.handlers.arrowRightPressed()
  }

  private keyUpListener(keyEvent: KeyboardEvent) {
    if (keyEvent.code === KEYS.LEFT) this.handlers.arrowLeftReleased()
    else if (keyEvent.code === KEYS.RIGHT) this.handlers.arrowRightReleased()
  }
}
