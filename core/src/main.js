import Game from "./game"
import { getLevels } from "./level/levelList"
import KeyboardListener from "./listener/keyboardListener"
import { Screen, setCurrentScreen } from "./listener/store"

const canvas = window.document.querySelector("canvas")
canvas.addEventListener("contextmenu", (event) => event.preventDefault())
const ctx = canvas.getContext("2d")

canvas.width = 1024
canvas.height = 640

const game = new Game(canvas, ctx)

new KeyboardListener()

game.start()

// Outcomment this for debugging and comment game.menu.open()
// setCurrentScreen(Screen.Game)
// game.startLevel(getLevels(game)["Level 3"])
// game.pause.open()

game.menu.open()
