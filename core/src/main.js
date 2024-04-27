import KeyboardListener from "./listener/keyboardListener"
import Game from "./game"
import LevelParser from "./level/levelParser"

const game = new Game()
const keyboardListener = new KeyboardListener()

window.addEventListener("keydown", (event) =>
    keyboardListener.handleKeyDown(event)
)
window.addEventListener("keyup", (event) => keyboardListener.handleKeyUp(event))

function testToken() {
    const levelParser = new LevelParser(
        `
        p b b - - - - - - p
        b b - b - - - p - b
        `
    )
}

testToken()

game.start()
