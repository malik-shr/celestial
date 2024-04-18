import KeyboardListener from "./engine/listener/keyboardListener"
import { Game } from "./game"
import Player from "./engine/player"

const player = new Player(240, 160)
const game = new Game(player)
const keyboardListener = new KeyboardListener(player)

window.addEventListener("keydown", (event) => {
    keyboardListener.listen(event)
})

game.start()