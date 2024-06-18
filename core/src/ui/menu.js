import { LevelButton, MenuButton, TransparentButton } from "./button"
import ButtonList from "./buttonList"
import { Screen, setCurrentScreen } from "../listener/store"
import Sprite from "../element/sprite"
import Help from "./modal/help"
import Settings from "./modal/settings"
import { getPlanets } from "../planets"
import Stats from "./modal/stats"

export default class Menu {
    constructor(levelList, game, canvas) {
        this.canvas = canvas
        this.game = game

        this.levelList = levelList

        this.isActive = false

        this.mainList = new ButtonList(canvas)
        this.mainList.isActive = false

        this.startGame = this.startGame.bind(this)
        this.selectLevel = this.selectLevel.bind(this)
        this.selectPrev = this.selectPrev.bind(this)
        this.selectNext = this.selectNext.bind(this)
        this.openSettings = this.openSettings.bind(this)
        this.openHelp = this.openHelp.bind(this)
        this.openStats = this.openStats.bind(this)

        this.help = new Help(this.game, this.canvas)
        this.stats = new Stats(this.levelList, this.game, this.canvas)
        this.settings = new Settings(this.game, this, this.canvas)

        this.bg = new Sprite("menu/bg.png", 1024, 640, 1024, 640)
        this.logo = new Sprite("menu/logo.png", 448, 280, 1024, 640)

        this.planetList = getPlanets(canvas)
        this.planetKeys = Object.keys(this.planetList)

        this.currentPlanetIndex = 0
        this.animationIndex = 0

        const statsButton = new MenuButton(this.openStats, 24, 30, 50, 50, "📊", 34)
        const helpButton = new MenuButton(this.openHelp, 880, 30, 50, 50, "?", 34)
        const settingsBtn = new MenuButton(this.openSettings, 950, 30, 50, 50, "⚙️", 34)

        /** @type {SlideButton} */
        this.nextBtn = new TransparentButton(this.selectNext, 1024 - 180 - 80, 380, 75, 65, "➡")
        /** @type {SlideButton} */
        this.prevBtn = new TransparentButton(this.selectPrev, 180, 380, 75, 65, "⬅")

        this.mainList.add(statsButton)
        this.mainList.add(helpButton)
        this.mainList.add(settingsBtn)

        this.mainList.add(this.nextBtn)
        this.mainList.add(this.prevBtn)

        this.planets = new Sprite("menu/planets.png", 1024, 640, 1024, 640)

        for (const planet of this.planetKeys) {
            for (const meta of this.levelList.getLevelPlanets(planet)) {
                this.planetList[planet].buttonList.add(
                    new LevelButton(
                        () => this.selectLevel(meta.name),
                        meta.button.position.x,
                        meta.button.position.y,
                        this,
                        meta
                    )
                )
            }
        }

        this.activePlanet = this.planetList[this.planetKeys[this.currentPlanetIndex]]
        this.activePlanet.buttonList.isActive = true

        this.currentPlanetIndex = 0
        this.nextBtn.isActive = true
        this.prevBtn.isActive = false
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
        this.help.close()
        this.settings.close()
        this.stats.close()
    }

    updateAnimationIndex() {
        if (this.animationIndex < this.currentPlanetIndex) {
            this.animationIndex += 1 / 20

            if (this.animationIndex > this.currentPlanetIndex) {
                this.animationIndex = this.currentPlanetIndex
            }
        }

        if (this.animationIndex > this.currentPlanetIndex) {
            this.animationIndex -= 1 / 20

            if (this.animationIndex < this.currentPlanetIndex) {
                this.animationIndex = this.currentPlanetIndex
            }
        }
    }

    draw(ctx) {
        this.updateAnimationIndex()
        this.bg.draw(ctx, 0, 0, { x: 0, y: 0 })
        this.logo.draw(ctx, 0, 0, { x: this.canvas.width / 2 - this.logo.width / 2, y: -40 })

        this.planets.draw(ctx, this.animationIndex, 0, { x: 0, y: 90 })

        this.mainList.draw(ctx)
        if (this.animationIndex === this.currentPlanetIndex) {
            this.activePlanet.buttonList.draw(ctx)
        }

        this.settings.draw(ctx)
        this.help.draw(ctx)
        this.stats.draw(ctx)
    }

    open() {
        setCurrentScreen(Screen.Menu)

        this.updateButtonMeta()

        this.mainList.isActive = true
        this.isActive = true

        this.resetPlanetButtons()
        this.activePlanet.buttonList.isActive = true
        this.levelList.refreshStats()
    }

    updateButtonMeta() {
        for (const key of this.planetKeys) {
            for (const button of this.planetList[key].buttonList.buttons) {
                button.meta = this.levelList.get(button.meta.name)
            }
        }
    }

    close() {
        this.mainList.isActive = false
        this.isActive = false

        this.resetPlanetButtons()

        this.closeModals()
    }

    openSettings() {
        this.closeModals()
        this.settings.open()
    }

    openHelp() {
        this.closeModals()
        this.help.open()
    }

    openStats() {
        this.closeModals()
        this.stats.open()
    }

    startGame() {
        setCurrentScreen(Screen.Game)
        this.close()
    }

    selectLevel(name) {
        this.close()

        const meta = this.levelList.get(name)

        this.game.startLevel(meta)
    }
}
