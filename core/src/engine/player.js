export default class Player{
    x
    y
    
    velocityX
    velocityY

    direction
    isJumping

    constructor(x, y) {
        this.x = x
        this.y = y
        this.velocityX = 0
        this.velocityY = 0
        this.isJumping = false
    }
}