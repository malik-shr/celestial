import KeyboardListener from "./listener/keyboardListener"
import Game from "./game"

const game = new Game()
const keyboardListener = new KeyboardListener()

window.addEventListener("keydown", (event) => keyboardListener.handleKeyDown(event))
window.addEventListener("keyup", (event) => keyboardListener.handleKeyUp(event))

game.start()