import { keysPressed } from "../../store"

export default class KeyboardListener{
    handleKeyDown(event) {
        if(!keysPressed.has(event.key)) return

        keysPressed.set(event.key, true)
    }

    handleKeyUp(event) {
        if(!keysPressed.has(event.key)) return

        keysPressed.set(event.key, false)
    }
}