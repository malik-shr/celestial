import { currentScreen, keysPressed } from "./store"

export default class KeyboardListener {
    constructor(game) {
        this.game = game

        window.addEventListener("keydown", (event) => this.handleKeyDown(event))
        window.addEventListener("keyup", (event) => this.handleKeyUp(event))
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
