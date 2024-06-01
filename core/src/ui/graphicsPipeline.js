function renderText(ctx, size) {
    ctx.fillStyle = "white"
    ctx.font = `${size} Montserrat`
    ctx.textAlign = "center"

    ctx.fillText(
        this.game.level.name,
        250 + Math.abs(this.game.camera.position.x),
        20 - Math.abs(this.game.camera.position.y)
    )
    ctx.fillText(
        (this.game.time / 1000).toFixed(2),
        450 + Math.abs(this.game.camera.position.x),
        20 - Math.abs(this.game.camera.position.y)
    )
}

function renderParticles(ctx, position) {
    ctx.beginPath()

    ctx.endPath()
}
