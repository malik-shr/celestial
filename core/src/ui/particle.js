export class Particle {
    constructor(x, y, color) {
        this.position = {
            x: x,
            y: y,
        }
        this.size = 5

        this.speed = {
            x: Math.random() * 1.5 - 0.75,
            y: Math.random() * 1.5 - 0.75,
        }
        this.color = color
    }
    update() {
        this.position.x += this.speed.x
        this.position.y += this.speed.y
        if (this.size > 0.1) this.size -= 0.05
    }
    draw(ctx) {
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.rect(this.position.x, this.position.y, this.size, this.size)
        ctx.closePath()
        ctx.fill()
    }
}

export default class Particles {
    constructor(x, y, colors) {
        this.particles = []
        this.particleFrame = 0
        this.isActive = true
        this.particleCounter = 0

        this.colors = colors

        this.position = {
            x: x,
            y: y,
        }

        this.isActive = true

        for (let i = 0; i < 20; i++) {
            this.particles.push(
                new Particle(this.position.x, this.position.y, this.getRandomColor())
            )
        }
    }

    draw(ctx) {
        ++this.particleCounter

        if (this.particleCounter === 60) {
            this.isActive = false
        }

        if (!this.isActive) return
        this.particles.forEach((particle, index) => {
            particle.update()
            particle.draw(ctx)
            if (particle.size <= 0.1) {
                this.particles.splice(index, 1)
                this.particles.push(
                    new Particle(this.position.x, this.position.y, this.getRandomColor())
                )
            }
        })
    }

    getRandomColor() {
        const index = Math.floor(Math.random() * this.colors.length)

        return this.colors[index]
    }
}
