import { Screen, setCurrentScreen } from "../../listener/store"
import { MenuButton } from "../button"
import Modal from "./modal"

export default class SubMenu extends Modal {
    constructor(menu, game, canvas, level = "") {
        super(canvas.width - 250 - 50, canvas.height - 250 - 50, 250, 250, game, canvas)

        this.menu = menu

        this.level = level

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
        super.open()
    }

    close() {
        super.close()
        this.menu.close()
    }

    draw(ctx) {
        super.updateFrames()

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
