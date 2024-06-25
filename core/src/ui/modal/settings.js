import { drawText } from "../../utils"
import { Checkbox, MenuButton } from "../button"
import Modal from "./modal"

export default class Settings extends Modal {
    constructor(game, menu, canvas) {
        super("Settings", 300, 300, game, canvas)

        this.menu = menu

        this.close = this.close.bind(this)
        this.handleSound = this.handleSound.bind(this)
        this.clearLocalStorage = this.clearLocalStorage.bind(this)

        this.marginX = 80

        this.soundButton = new Checkbox(
            this.handleSound,
            this.box.position.x + this.marginX + 50,
            this.box.position.y + this.height - 50 - 25 - 140,
            30,
            30,
            "Sound",
            22,
            2
        )

        const clearButton = new MenuButton(
            this.clearLocalStorage,
            this.box.position.x + this.marginX / 2,
            this.box.position.y + this.height - 50 - 25 - 80,
            this.width - this.marginX,
            50,
            "Reset Progress",
            22,
            2
        )

        const closeButton = new MenuButton(
            this.close,
            this.box.position.x + this.width / 2 - 140 / 2,
            this.box.position.y + this.height - 50 - 25,
            140,
            50,
            "Close"
        )

        this.buttonList.add(this.soundButton)
        this.buttonList.add(clearButton)
        this.buttonList.add(closeButton)

        window.addEventListener("keyup", (event) => {
            if (event.key === "Escape") {
                if (!this.isActive) return

                this.close()
            }
        })
    }

    open() {
        super.open()

        this.soundButton.isChecked = !this.menu.music.mute
    }

    handleSound() {
        this.menu.music.muteVolume()
        this.soundButton.isChecked = !this.soundButton.isChecked

        if (!this.menu.music.mute) {
            this.menu.music.startMenuMusic()
        }
    }

    clearLocalStorage() {
        localStorage.clear()

        this.game.levelList.refresh()
        this.menu.updateButtonMeta()

        this.close()
    }

    draw(ctx) {
        super.drawDimmed(ctx)
        super.updateFrames(10)

        ctx.beginPath()
        ctx.save()

        super.scaleBox(ctx)
        super.drawBox(ctx)
        super.drawTitle(ctx)

        ctx.fillStyle = `rgba(227, 227, 210, ${this.opacity})`
        ctx.font = `500 22px Montserrat`
        ctx.textAlign = "left"

        ctx.fillText(
            "Sound",
            this.box.position.x + this.marginX / 2,
            this.box.position.y + this.height - 50 - 25 - 125
        )

        this.buttonList.draw(ctx)

        ctx.restore()
        ctx.closePath()
    }
}
