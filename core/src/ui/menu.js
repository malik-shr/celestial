import { MenuButton } from "./button"
import ButtonList from "./buttonList"
import { Screen, setCurrentScreen } from "../listener/store"

export default class Menu {
    constructor(canvas, ctx, game) {
        this.canvas = canvas
        this.ctx = ctx
        this.game = game

        this.isActive = false

        this.buttonList = new ButtonList(canvas)
        this.buttonList.isActive = false

        this.startGame = this.startGame.bind(this)

        const startButton = new MenuButton(this.startGame, 20, 20, 150, 50, "Start")

        this.buttonList.add(startButton)
    }

    draw() {
        this.buttonList.draw(this.ctx)
    }

    openMenu() {
        this.buttonList.isActive = true
        this.isActive = true
    }

    closeMenu() {
        this.buttonList.isActive = false
        this.isActive = false
    }

    startGame() {
        setCurrentScreen(Screen.Game)
        this.closeMenu()
    }
}
