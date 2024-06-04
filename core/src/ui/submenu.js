import { Screen, currentScreen, setCurrentScreen } from "../listener/store"
import { MenuButton } from "./button"
import ButtonList from "./buttonList"

export default class SubMenu {
    constructor(menu, game, canvas, level = "") {
        this.canvas = canvas
        this.menu = menu
        this.game = game

        this.level = level

        this.scale = 0

        this.isActive = false

        this.buttonList = new ButtonList(canvas)
        this.buttonList.isActive = false

        this.width = 250
        this.height = 250

        this.box = {
            position: {
                x: this.canvas.width - this.width - 50,
                y: this.canvas.height - this.height - 50,
            },
        }

        this.startGame = this.startGame.bind(this)

        const startButton = new MenuButton(
            this.startGame,
            this.box.position.x + this.width / 2 - 80,
            this.box.position.y + this.height - 70,
            160,
            50,
            "Start"
        )

        this.buttonList.add(startButton)
    }

    startGame() {
        this.close()
        setCurrentScreen(Screen.Game)

        this.game.startLevel(this.level)
    }

    open() {
        this.isActive = true

        this.buttonList.isActive = true
    }

    close() {
        this.isActive = false
        this.buttonList.isActive = false

        this.menu.close()
    }

    draw(ctx) {
        ctx.beginPath()
        ctx.save()

        ctx.fillStyle = "rgba(144, 238, 144, 1)"
        ctx.roundRect(this.box.position.x, this.box.position.y, this.width, this.height, [15])
        ctx.fill()

        ctx.fillStyle = "white"
        ctx.font = "800 26px Montserrat"
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"

        ctx.fillText(this.level, this.box.position.x + this.width / 2, this.box.position.y + 40)

        this.buttonList.draw(ctx)

        ctx.restore()
        ctx.closePath()
    }
}
