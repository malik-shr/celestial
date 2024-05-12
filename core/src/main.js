import Game from "./game"
import KeyboardListener from "./listener/keyboardListener"

const game = new Game()
const keyboardListener = new KeyboardListener()

game.start()

window.addEventListener("keydown", (event) => keyboardListener.handleKeyDown(event))
window.addEventListener("keyup", (event) => keyboardListener.handleKeyUp(event))
