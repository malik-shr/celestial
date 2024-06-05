import { LevelButton } from "./button"

export default class ButtonList {
    constructor(canvas) {
        this.canvas = canvas

        this.isActive = false
        this.buttons = []

        this.canvas.addEventListener("click", (e) => this.onClick(e))
        this.canvas.addEventListener("mousedown", (e) => this.onMouseDown(e))
        this.canvas.addEventListener("mouseup", (e) => this.onMouseUp(e))
        this.canvas.addEventListener("mousemove", (e) => this.onHover(e))
    }

    add(button) {
        this.buttons.push(button)
    }

    onClick(e) {
        if (!this.isActive) return

        for (const button of this.buttons) {
            if (button instanceof LevelButton) continue

            const mousePos = this.getMousePos(this.canvas, e)

            if (this.isInside(mousePos, button.rect)) {
                button.action()

                break
            }
        }
    }

    onMouseDown(e) {
        if (!this.isActive) return

        for (const button of this.buttons) {
            if (!(button instanceof LevelButton)) continue

            const mousePos = this.getMousePos(this.canvas, e)

            if (this.isInside(mousePos, button.rect)) {
                button.clicked = true

                break
            }
        }
    }

    onMouseUp(e) {
        if (!this.isActive) return

        for (const button of this.buttons) {
            if (!(button instanceof LevelButton)) continue

            button.clicked = false
        }
    }

    onHover(e) {
        if (!this.isActive) return

        for (const button of this.buttons) {
            const mousePos = this.getMousePos(this.canvas, e)

            if (this.isInside(mousePos, button.rect)) {
                button.hover = true
            } else {
                button.hover = false
            }
        }
    }

    draw(ctx) {
        for (const button of this.buttons) {
            button.draw(ctx)
        }
    }

    getMousePos(canvas, event) {
        const rect = canvas.getBoundingClientRect()
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
        }
    }

    isInside(pos, rect) {
        return (
            pos.x > rect.position.x &&
            pos.x < rect.position.x + rect.width &&
            pos.y < rect.position.y + rect.height &&
            pos.y > rect.position.y
        )
    }
}
