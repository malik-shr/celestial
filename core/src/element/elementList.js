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

    checkCollision() {
        for (const element of this) {
            element.checkCollision()
        }
    }

    action() {
        for (const element of this) {
            element.action()
        }
    }

    draw(ctx) {
        for (const element of this) {
            element.draw(ctx)
        }
    }
}
