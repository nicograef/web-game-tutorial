import { KEYS } from './enums'

interface IInputHandlers {
  arrowLeftPressed: () => void
  arrowLeftReleased: () => void
  arrowRightPressed: () => void
  arrowRightReleased: () => void
}

export default class InputHandler {
  constructor(private handlers: IInputHandlers) {}

  public setupAllListeners() {
    document.addEventListener('keydown', this.keyDownListener.bind(this))
    document.addEventListener('keyup', this.keyUpListener.bind(this))
    return this.cleanupAllListeners
  }

  public cleanupAllListeners() {
    document.removeEventListener('keydown', this.keyDownListener.bind(this))
    document.removeEventListener('keyup', this.keyUpListener.bind(this))
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
