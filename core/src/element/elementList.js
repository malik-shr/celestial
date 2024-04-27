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
            elementItem.checkCollision(element)
        }
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
