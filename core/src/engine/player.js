export default class Player{
    x
    y
    
    velocityX
    velocityY

    direction

    constructor(x, y) {
        this.x = x
        this.y = y
        this.velocityX = 0
        this.velocityY = 0
    }
}