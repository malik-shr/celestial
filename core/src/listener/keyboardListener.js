import { currentScreen, keysPressed } from "./store"

export default class KeyboardListener {
    constructor(game) {
        this.game = game

        window.addEventListener("keydown", (event) => this.handleKeyDown(event))
        window.addEventListener("keyup", (event) => this.handleKeyUp(event))

        window.addEventListener("keyup", (event) => {
            if (
                this.game.pause === null ||
                currentScreen !== Screen.Game ||
                this.game.completed.isActive
            ) {
                return
            }

            if (event.key === "Escape") {
                if (!this.game.pause.isActive) {
                    this.game.pause.open()
                    return
                }

                this.game.pause.resumeGame()
            }
        })
    }

    handleKeyDown(event) {
        if (!keysPressed.has(event.key)) return

        keysPressed.set(event.key, true)
    }

    handleKeyUp(event) {
        if (!keysPressed.has(event.key)) return

        keysPressed.set(event.key, false)
    }
}
