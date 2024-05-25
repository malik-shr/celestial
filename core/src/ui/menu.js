import { MenuButton } from "./button"
import ButtonList from "./buttonList"
import { Screen, setCurrentScreen } from "../listener/store"

export default class Menu {
    constructor(canvas, ctx, game) {
        this.canvas = canvas
        this.ctx = ctx
        this.game = game

        this.menuActive = true

        this.buttonList = new ButtonList(canvas)
        this.buttonList.isActive = true

        this.startGame = this.startGame.bind(this)

        const startButton = new MenuButton(this.startGame, this.canvas.width / 2, 20, "Start")

        this.buttonList.add(startButton)
    }

    draw() {
        this.buttonList.draw(this.ctx)
    }

    startGame() {
        setCurrentScreen(Screen.Game)
        this.buttonList.isActive = false
    }
}
