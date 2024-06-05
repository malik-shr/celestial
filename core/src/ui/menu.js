import { LevelButton, MenuButton, SlideButton } from "./button"
import ButtonList from "./buttonList"
import { Screen, setCurrentScreen } from "../listener/store"
import LevelStarter from "./modal/levelStarter"
import Sprite from "../element/sprite"
import Help from "./modal/help"
import Settings from "./modal/settings"
import { getPlanets } from "../planets"

export default class Menu {
    constructor(game, canvas) {
        this.canvas = canvas
        this.game = game

        this.isActive = false

        this.mainList = new ButtonList(canvas)
        this.mainList.isActive = false

        this.startGame = this.startGame.bind(this)
        this.selectLevel = this.selectLevel.bind(this)
        this.selectPrev = this.selectPrev.bind(this)
        this.selectNext = this.selectNext.bind(this)
        this.openSettings = this.openSettings.bind(this)
        this.openHelp = this.openHelp.bind(this)

        this.levelStarter = null
        this.help = null
        this.settings = null

        this.bg = new Sprite("bg/bg_menu.png", 1024, 640, 1024, 640)

        this.planetList = getPlanets(canvas)

        this.planetKeys = Object.keys(this.planetList)
        this.currentPlanetIndex = 0

        const settingsBtn = new MenuButton(this.openSettings, 950, 40, 50, 50, "⚙️", 34)
        const helpButton = new MenuButton(this.openHelp, 880, 40, 50, 50, "?", 34)

        /** @type {SlideButton} */
        this.nextBtn = new SlideButton(this.selectNext, 1024 - 180 - 80, 360, 75, 65, "🡲")
        /** @type {SlideButton} */
        this.prevBtn = new SlideButton(this.selectPrev, 180, 360, 75, 65, "🡰")

        this.mainList.add(helpButton)
        this.mainList.add(settingsBtn)

        this.mainList.add(this.nextBtn)
        this.mainList.add(this.prevBtn)

        const levelButton = new LevelButton(
            () => this.selectLevel(levelButton),
            400,
            320,
            "Level 1"
        )

        this.planetList.moon.buttonList.add(levelButton)

        this.activePlanet = this.planetList[this.planetKeys[this.currentPlanetIndex]]
    }

    selectNext() {
        if (!this.nextBtn.isActive) return
        if (this.currentPlanetIndex === this.planetKeys.length - 1) {
            this.currentPlanetIndex = 0
        } else {
            ++this.currentPlanetIndex
        }

        // after change
        if (this.currentPlanetIndex === this.planetKeys.length - 1) {
            this.nextBtn.isActive = false
        } else {
            this.nextBtn.isActive = true
        }

        this.prevBtn.isActive = true

        this.resetPlanetButtons()

        this.activePlanet = this.planetList[this.planetKeys[this.currentPlanetIndex]]
        this.activePlanet.buttonList.isActive = true
    }

    selectPrev() {
        if (!this.prevBtn.isActive) return
        if (this.currentPlanetIndex === 0) {
            this.currentPlanetIndex = this.planetKeys.length - 1
        } else {
            --this.currentPlanetIndex
        }

        // after change
        if (this.currentPlanetIndex === 0) {
            this.prevBtn.isActive = false
        } else {
            this.prevBtn.isActive = true
        }

        this.nextBtn.isActive = true

        this.resetPlanetButtons()

        this.activePlanet = this.planetList[this.planetKeys[this.currentPlanetIndex]]
        this.activePlanet.buttonList.isActive = true
    }

    resetPlanetButtons() {
        for (const key of this.planetKeys) {
            this.planetList[key].buttonList.isActive = false
        }
    }

    closeModals() {
        if (this.help !== null) {
            this.help.close()
        }

        if (this.settings !== null) {
            this.settings.close()
        }

        if (this.levelStarter !== null) {
            this.levelStarter.close()
        }
    }

    draw(ctx) {
        this.bg.draw(ctx, 0, 0, { x: 0, y: 0 })

        this.activePlanet.sprite.draw(ctx, 0, 0, {
            x: this.canvas.width / 2 - this.activePlanet.sprite.width / 2,
            y: this.canvas.height / 2 - this.activePlanet.sprite.height / 2 + 60,
        })

        this.mainList.draw(ctx)
        this.activePlanet.buttonList.draw(ctx)

        if (this.levelStarter !== null) {
            this.levelStarter.draw(ctx)
        }

        if (this.settings !== null) {
            this.settings.draw(ctx)
        }

        if (this.help !== null) {
            this.help.draw(ctx)
        }
    }

    open() {
        setCurrentScreen(Screen.Menu)

        this.mainList.isActive = true
        this.isActive = true

        this.resetPlanetButtons()
        this.activePlanet = this.planetList[this.planetKeys[this.currentPlanetIndex]]
        this.activePlanet.buttonList.isActive = true

        this.currentPlanetIndex = 0
        this.nextBtn.isActive = true
        this.prevBtn.isActive = false
    }

    close() {
        this.mainList.isActive = false
        this.isActive = false

        this.resetPlanetButtons()

        this.closeModals()
    }

    openSettings() {
        this.closeModals()

        this.settings = new Settings(this.game, this.canvas)
        this.settings.open()
    }

    openHelp() {
        this.closeModals()

        this.help = new Help(this.game, this.canvas)
        this.help.open()
    }

    startGame() {
        setCurrentScreen(Screen.Game)
        this.close()
    }

    selectLevel(button) {
        this.levelStarter = new LevelStarter(this, this.game, this.canvas, button.level)
        this.levelStarter.open()
    }
}
