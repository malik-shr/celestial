import Particle from "./particle"

export function renderText(ctx, x, y, text, size, align) {
    ctx.fillStyle = "white"
    ctx.font = `${size}px Montserrat`
    ctx.textAlign = align

    ctx.fillText(text, x, y)
}

export function renderParticle() {
    const particlesArray = []

    for (let i = 0; i < 200; i++) {
        particlesArray.push(new Particle())
    }
}

// // Animate particles
// function animate() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     particlesArray.forEach((particle, index) => {
//         particle.update();
//         particle.draw();
//         if (particle.size <= 0.1) {
//             particlesArray.splice(index, 1);
//             particlesArray.push(new Particle());
//         }
//     });
//     requestAnimationFrame(animate);
// }
