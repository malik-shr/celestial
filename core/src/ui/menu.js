import { LevelButton, MenuButton, TransparentButton } from "./button"
import ButtonList from "./buttonList"
import { Screen, setCurrentScreen } from "../listener/store"
import Sprite from "../element/sprite"
import Help from "./modal/help"
import Settings from "./modal/settings"
import { getPlanets } from "../planets"
import { getLevelMetas } from "../level/levelList"

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

        this.help = new Help(this.game, this.canvas)
        this.settings = new Settings(this.game, this.canvas)

        this.bg = new Sprite("bg/bg_menu.png", 1024, 640, 1024, 640)

        this.planetList = getPlanets(canvas)

        this.planetKeys = Object.keys(this.planetList)
        this.currentPlanetIndex = 0
        this.animationIndex = 0

        const settingsBtn = new MenuButton(this.openSettings, 950, 40, 50, 50, "⚙️", 34)
        const helpButton = new MenuButton(this.openHelp, 880, 40, 50, 50, "?", 34)

        /** @type {SlideButton} */
        this.nextBtn = new TransparentButton(this.selectNext, 1024 - 180 - 80, 360, 75, 65, "🡲")
        /** @type {SlideButton} */
        this.prevBtn = new TransparentButton(this.selectPrev, 180, 360, 75, 65, "🡰")

        this.mainList.add(helpButton)
        this.mainList.add(settingsBtn)

        this.mainList.add(this.nextBtn)
        this.mainList.add(this.prevBtn)

        this.planets = new Sprite("bg/planets.png", 1024, 640, 1024, 640)

        this.levelMetas = getLevelMetas()

        const level1Btn = new LevelButton(
            () => this.selectLevel(level1Btn),
            400,
            320,
            this.levelMetas["Level 1"]
        )

        level1Btn.hover = true

        const level2Btn = new LevelButton(
            () => this.selectLevel(level2Btn),
            480,
            320,
            this.levelMetas["Level 2"]
        )

        const level3Btn = new LevelButton(
            () => this.selectLevel(level3Btn),
            550,
            320,
            this.levelMetas["Level 3"]
        )

        this.planetList.moon.buttonList.add(level1Btn)
        this.planetList.moon.buttonList.add(level2Btn)

        this.planetList.mars.buttonList.add(level3Btn)

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

        this.planets.draw(ctx, this.animationIndex, 0, { x: 0, y: 60 })

        this.mainList.draw(ctx)
        if (this.animationIndex === this.currentPlanetIndex) {
            this.activePlanet.buttonList.draw(ctx)
        }

        this.settings.draw(ctx)
        this.help.draw(ctx)
    }

    open() {
        setCurrentScreen(Screen.Menu)

        this.updateButtonMeta()

        this.mainList.isActive = true
        this.isActive = true

        this.resetPlanetButtons()
        this.activePlanet.buttonList.isActive = true
    }

    updateButtonMeta() {
        const newMetaData = getLevelMetas()

        for (const key of this.planetKeys) {
            for (const button of this.planetList[key].buttonList.buttons) {
                button.level = newMetaData[button.level.name]
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

    startGame() {
        setCurrentScreen(Screen.Game)
        this.close()
    }

    selectLevel(button) {
        this.close()

        setCurrentScreen(Screen.Game)
        this.game.startLevel(button.level)
    }
}
