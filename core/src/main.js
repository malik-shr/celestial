import KeyboardListener from "./engine/listener/keyboardListener"
import { Game } from "./game"
import LevelList from "./levels/levelList"

// TODO Implement logic for level architecture
const levelList = new LevelList()

const game = new Game(levelList)
const keyboardListener = new KeyboardListener()

window.addEventListener("keydown", (event) => keyboardListener.handleKeyDown(event))
window.addEventListener("keyup", (event) => keyboardListener.handleKeyUp(event))

game.start()