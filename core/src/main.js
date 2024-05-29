import Game from "./game"
import KeyboardListener from "./listener/keyboardListener"

const game = new Game()

new KeyboardListener()

game.start()
