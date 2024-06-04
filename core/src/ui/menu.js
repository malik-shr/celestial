import { LevelButton, MenuButton } from "./button"
import ButtonList from "./buttonList"
import { Screen, setCurrentScreen } from "../listener/store"
import SubMenu from "./submenu"

export default class Menu {
    constructor(canvas, ctx, game) {
        this.canvas = canvas
        this.ctx = ctx
        this.game = game

        this.isActive = false

        this.buttonList = new ButtonList(canvas)

        this.buttonList.isActive = false

        this.startGame = this.startGame.bind(this)
        this.selectLevel = this.selectLevel.bind(this)

        this.submenu = new SubMenu(this, this.game, this.canvas)

        const levelButton = new LevelButton(() => this.selectLevel(levelButton), 20, 20, "Level 1")

        this.width = 250
        this.height = 250

        this.box = {
            position: {
                x: this.canvas.width - this.width - 50,
                y: this.canvas.height - this.height - 50,
            },
        }

        //this.buttonList.add(startButton)
        this.buttonList.add(levelButton)
    }

    draw() {
        this.buttonList.draw(this.ctx)

        if (this.submenu !== null) {
            this.submenu.draw(this.ctx)
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
