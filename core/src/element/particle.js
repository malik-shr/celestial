import Element from "./element"

class Particle {
    constructor(x, y, color, size) {
        this.position = {
            x: x,
            y: y,
        }

        this.sizes = {
            0: { speedX: Math.random() * 1 - 0.75, speedY: Math.random() * 1.5 - 0.75, size: 4 },
            1: { speedX: Math.random() * 1.5 - 0.75, speedY: Math.random() * 1.5 - 0.75, size: 6 },
            2: { speedX: Math.random() * 1.5 - 0.75, speedY: Math.random() * 1.5 - 0.75, size: 6 },
        }

        this.data = this.sizes[size]

        this.speed = {
            x: this.data.speedX,
            y: this.data.speedY,
        }
        this.size = this.data.size

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

export default class Particles extends Element {
    constructor(x, y, colors, size) {
        super(x, y)
        this.particles = []
        this.particleFrame = 0
        this.isActive = true
        this.particleCounter = 0

        this.size = size

        this.colors = colors

        this.position = {
            x: x,
            y: y,
        }

        this.isActive = true

        for (let i = 0; i < size * 7 + 15; i++) {
            this.particles.push(
                new Particle(this.position.x, this.position.y, this.getRandomColor(), this.size)
            )
        }
    }

    draw(ctx) {
        ++this.particleCounter

        if (this.particleCounter === 40) {
            this.isActive = false
        }

        if (!this.isActive) return
        this.particles.forEach((particle, index) => {
            particle.update()
            particle.draw(ctx)
            if (particle.size <= 0.1) {
                this.particles.splice(index, 1)
                this.particles.push(
                    new Particle(this.position.x, this.position.y, this.getRandomColor(), this.size)
                )
            }
        })
    }

    getRandomColor() {
        const index = Math.floor(Math.random() * this.colors.length)

        return this.colors[index]
    }

    action() {}
}
