import { KEYS } from './enums'

interface IInputHandlers {
  arrowLeftPressed: () => void
  arrowLeftReleased: () => void
  arrowRightPressed: () => void
  arrowRightReleased: () => void
}

export default class InputHandler {
  constructor(handlers: IInputHandlers) {
    document.addEventListener('keydown', (keyDownEvent) => {
      // keyDownEvent.preventDefault()
      if (keyDownEvent.code === KEYS.LEFT) handlers.arrowLeftPressed()
      else if (keyDownEvent.code === KEYS.RIGHT) handlers.arrowRightPressed()
    })

    document.addEventListener('keyup', (keyDownEvent) => {
      // keyDownEvent.preventDefault()
      if (keyDownEvent.code === KEYS.LEFT) handlers.arrowLeftReleased()
      else if (keyDownEvent.code === KEYS.RIGHT) handlers.arrowRightReleased()
    })
  }
}
