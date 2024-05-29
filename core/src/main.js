import Game from "./game"
import KeyboardListener from "./listener/keyboardListener"
import Menu from "./ui/menu"

const canvas = window.document.querySelector("canvas")
const ctx = canvas.getContext("2d")

canvas.width = 1024
canvas.height = 576

const game = new Game(canvas, ctx)

new KeyboardListener()

game.start()
