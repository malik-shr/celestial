import Game from "./game"
import { getLevelMetas } from "./level/levelMeta"
import KeyboardListener from "./listener/keyboardListener"

const canvas = window.document.querySelector("canvas")
canvas.addEventListener("contextmenu", (event) => event.preventDefault())
const ctx = canvas.getContext("2d")

canvas.width = 1024
canvas.height = 640

const game = new Game(canvas, ctx)

new KeyboardListener()

game.start()

// Outcomment this for debugging and comment game.menu.open()
game.startLevel(getLevelMetas()["Level 1"])
//game.completed.open()

//game.menu.open()
