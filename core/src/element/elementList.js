import Goal from "./goal"
import MovingPlatform from "./movingPlatform"
import Player from "./player"
import Tutorial from "./tutorial"

export default class ElementList extends Array {
    constructor() {
        super()
    }

    add(element) {
        this.push(element)
    }

    get(i) {
        return this[i]
    }

    delete(i) {
        this.splice(i, 1)
    }

    checkCollision(element) {
        for (const elementItem of this) {
            // Replace Player with Entity later
            if (this.elementItem instanceof Player) {
                elementItem.checkCollision(element)
                break
            }
        }
    }

    resetMovingPlattforms() {
        for (const elementItem of this) {
            if (elementItem instanceof MovingPlatform) {
                elementItem.reset()
            }
        }
    }

    getHighestX() {
        if (this.length === 0) return 0

        let max = this[0].position.x

        for (const elementItem of this) {
            if (elementItem.position.x > max) {
                max = elementItem.position.x
            }
        }

        return max
    }

    getAmountTutorial() {
        let count = 0

        for (const elementItem of this) {
            if (elementItem instanceof Tutorial) {
                ++count
            }
        }

        return count
    }

    getPlayer() {
        for (const elementItem of this) {
            if (elementItem instanceof Player) {
                return elementItem
            }
        }

        return null
    }

    getGoal() {
        for (const elementItem of this) {
            if (elementItem instanceof Goal) {
                return elementItem
            }
        }

        return null
    }

    action() {
        for (const elementItem of this) {
            elementItem.action()
        }
    }

    draw(ctx) {
        for (const elementItem of this) {
            elementItem.draw(ctx)
        }
    }
}
