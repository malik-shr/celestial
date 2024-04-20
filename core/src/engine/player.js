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

    draw(ctx) {
        ctx.beginPath()
        ctx.rect(this.x, this.y, 50, 50);
        ctx.fillStyle = "red";
        ctx.fill(); 
        ctx.closePath()
    }
}