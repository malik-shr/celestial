export default class Element {
    constructor(x, y, width = 32, height = 32) {
        this.position = {
            x: x,
            y: y,
        }
        this.width = width
        this.height = height

        this.collisionOffset = {
            x: 0,
            y: 0,
        }
    }

    action() {}

    handleCollisionY(player) {}

    handleCollisionX(player) {}

    draw(ctx) {}
}
