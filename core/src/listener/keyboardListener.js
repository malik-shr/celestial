export default class KeyboardListener {
    keysPressed

    constructor() {
        this.keysPressed = new Map([
            ["ArrowRight", false],
            ["ArrowLeft", false],
            ["ArrowUp", false],
            [" ", false],
            ["ArrowDown", false],
        ])
    }

    handleKeyDown(event) {
        if (!this.keysPressed.has(event.key)) return

        this.keysPressed.set(event.key, true)
    }

    handleKeyUp(event) {
        if (!this.keysPressed.has(event.key)) return

        this.keysPressed.set(event.key, false)
    }

    handleKeys(canvas, player, camera) {
        // gravity accumulates every tick
        player.gravity += player.level.gravity

        // entschleunigung wenn man die jeweilige taste nicht drückt oder man die richtung von links nach rechts oder von rechts nach links wechselt
        // check with velocities not direction
        if (
            (!this.keysPressed.get("ArrowRight") &&
                !this.keysPressed.get("ArrowLeft")) ||
            (this.keysPressed.get("ArrowRight") && player.velocity.x < 0) ||
            (this.keysPressed.get("ArrowLeft") && player.velocity.x > 0)
        ) {
            player.velocity.x = 0
        }

        // beschleunigung wenn man die jeweilige taste drückt
        if (this.keysPressed.get("ArrowRight")) {
            if (player.velocity.x < 120) {
                player.velocity.x += 8
            }

            player.shouldPanCameraToTheLeft(canvas, camera)
        }

        if (this.keysPressed.get("ArrowLeft")) {
            if (player.velocity.x > -120) {
                player.velocity.x -= 8
            }

            player.shouldPanCameraToTheRight(canvas, camera)
        }

        // second part means you can only jump if grounded
        if (this.keysPressed.get(" ") && player.isJumping === false) {
            player.velocity.y = -150
            player.isJumping = true
        }

        if (
            !this.keysPressed.get(" ") &&
            player.velocity.y < -player.gravity - 64 &&
            player.isJumping === true
        ) {
            player.velocity.y = -player.gravity - 64
        }
    }
}
