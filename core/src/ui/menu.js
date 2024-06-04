import { LevelButton } from "./button"
import ButtonList from "./buttonList"
import { Screen, setCurrentScreen } from "../listener/store"
import SubMenu from "./modal/submenu"

export default class Menu {
    constructor(game, canvas) {
        this.canvas = canvas
        this.game = game

        this.isActive = false

        this.buttonList = new ButtonList(canvas)

        this.buttonList.isActive = false

        this.startGame = this.startGame.bind(this)
        this.selectLevel = this.selectLevel.bind(this)

        this.submenu = new SubMenu(this, this.game, this.canvas)

        const levelButton = new LevelButton(() => this.selectLevel(levelButton), 20, 20, "Level 1")

        //this.buttonList.add(startButton)
        this.buttonList.add(levelButton)
    }

    draw(ctx) {
        this.buttonList.draw(ctx)

        if (this.submenu !== null) {
            this.submenu.draw(ctx)
        }
    }

    open() {
        this.buttonList.isActive = true
        this.isActive = true
    }

    close() {
        this.buttonList.isActive = false
        this.isActive = false
    }

    startGame() {
        setCurrentScreen(Screen.Game)
        this.close()
    }

    selectLevel(button) {
        this.submenu = new SubMenu(this, this.game, this.canvas, button.level)
        this.submenu.open()
    }
}
