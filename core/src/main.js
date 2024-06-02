import Game from "./game"
import KeyboardListener from "./listener/keyboardListener"

const canvas = window.document.querySelector("canvas")
const ctx = canvas.getContext("2d")

canvas.width = 1024
canvas.height = 640

const game = new Game(canvas, ctx)

new KeyboardListener()

game.start()
