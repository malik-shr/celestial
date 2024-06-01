export class Particle {
    constructor(x, y) {
        this.position = {
            x: x,
            y: y,
        }
        this.size = Math.random() * 2 + 0.5 // Smaller particles
        this.speedX = Math.random() * 3 - 1.5
        this.speedY = Math.random() * 3 - 1.5
        this.color = "rgba(255, 255, 255, 0.8)"
    }
    update() {
        this.position.x += this.speedX
        this.position.y += this.speedY
        if (this.size > 0.1) this.size -= 0.05
    }
    draw(ctx) {
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.position.x, this.position.y, this.size, 0, Math.PI * 2)
        ctx.closePath()
        ctx.fill()
    }
}

export default class Particles {
    constructor(x, y) {
        this.particles = []
        this.particleFrame = 0
        this.isActive = true
        this.particleCounter = 0

        this.position = {
            x: x,
            y: y,
        }

        this.isActive = true

        for (let i = 0; i < 400; i++) {
            this.particles.push(new Particle(this.position.x, this.position.y))
        }
    }

    animate(ctx) {
        ++this.particleCounter

        if (this.particleCounter === 100) {
            this.isActive = false
        }

        if (!this.isActive) return
        this.particles.forEach((particle, index) => {
            particle.update()
            particle.draw(ctx)
            if (particle.size <= 0.1) {
                this.particles.splice(index, 1)
                this.particles.push(new Particle(this.position.x, this.position.y))
            }
        })
    }
}
