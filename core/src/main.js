import Game from "./game"
import Level from "./level/level"
import LevelList from "./level/levellist"

const canvas = window.document.querySelector("canvas")
canvas.addEventListener("contextmenu", (event) => event.preventDefault())
const ctx = canvas.getContext("2d")

canvas.width = 1024
canvas.height = 640

const game = new Game(canvas, ctx)

game.start()

// Outcomment this for debugging and comment game.menu.open()
// const ll = new LevelList()
// game.startLevel(ll.get("Level 1"))

game.menu.open()
