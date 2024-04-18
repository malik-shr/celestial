import KeyboardListener from "./engine/listener/keyboardListener"
import { Game } from "./game"

const game = new Game()
const keyboardListener = new KeyboardListener()

window.addEventListener("click", () => {
    keyboardListener().listen()
})

game.start()