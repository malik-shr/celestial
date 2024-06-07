import Element from "./element"
import { keysPressed } from "../listener/store"

import ElementList from "./elementList"
import Player from "./player"
import Checkpoint from "./checkpoint"
import JumpPad from "./jumpPad"
import MovingPlatform from "./movingPlatform"
import SolidBlock from "./solidBlock"
import TemporaryBlock from "./temporaryBlock"
import Spike from "./spike"
import Goal from "./goal"
import Bubble from "./bubble"

export default class levelEditor extends Element {
    constructor(game, level) {
        super(0, 0, 32, 32)
        this.game = game
        this.level = level

        this.mouse = { x: 0, y: 0 }
        this.isActive = false

        this.BlockType = 1
        this.sizeX = 32
        this.sizeY = 32
        this.speedX = 1
        this.speedY = 0
        this.Sprite = 6

        window.addEventListener("mousemove", (event) => this.handleMouseMove(event))
        window.addEventListener("mousedown", (event) => this.handleMouseDown(event))

        window.addEventListener("keyup", (event) => {
            if (event.key === "Control" && !this.pressed) {
                if (!this.isActive) {
                    this.isActive = true
                } else {
                    this.isActive = false
                }
                if (keysPressed.get("s")) {
                    this.leveltoConsole()
                }
            }
            this.pressed = true
        })
    }

    action() {
        this.pressed = false
    }

    handleMouseDown(event) {
        // add element
        if (this.isActive && !this.pressed && event.button === 0) {
            // set positions
            this.positionX =
                this.mouse.x / 2 -
                this.game.camera.position.x -
                ((this.mouse.x / 2 - this.game.camera.position.x) % 32)
            if (this.mouse.y / 2 - this.game.camera.position.y >= 0) {
                this.positionY =
                    this.mouse.y / 2 -
                    this.game.camera.position.y -
                    ((this.mouse.y / 2 - this.game.camera.position.y) % 32)
            } else {
                this.positionY =
                    this.mouse.y / 2 -
                    this.game.camera.position.y -
                    ((this.mouse.y / 2 - this.game.camera.position.y) % 32) -
                    32
            }
            // set the desired blocks
            switch (this.BlockType) {
                case 1:
                    this.game.level.elementList.add(
                        new SolidBlock(
                            this.positionX,
                            this.positionY,
                            this.sizeX,
                            this.sizeY,
                            this.Sprite
                        )
                    )
                    break
                case 2:
                    this.game.level.elementList.add(
                        new MovingPlatform(
                            this.positionX,
                            this.positionY,
                            this.sizeX,
                            this.sizeY,
                            this.speedX,
                            this.speedY,
                            this.maxDistanceX,
                            this.maxDistanceY
                        )
                    )
                    break
                case 3:
                    this.game.level.elementList.add(
                        new JumpPad(this.positionX, this.positionY, this.sizeX, this.sizeY)
                    )
                    break
                case 4:
                    this.game.level.elementList.add(
                        new Spike(this.positionX, this.positionY, this.sizeX, this.sizeY)
                    )
                    break
                case 5:
                    this.game.level.elementList.add(
                        new Bubble(this.positionX, this.positionY, this.sizeX, this.sizeY)
                    )
                    break
                case 6:
                    this.game.level.elementList.add(
                        new TemporaryBlock(this.positionX, this.positionY, this.sizeX, this.sizeY)
                    )
                    break
                case 7:
                    this.game.level.elementList.add(
                        new Checkpoint(
                            this.positionX,
                            this.positionY,
                            this.game,
                            this.sizeX,
                            this.sizeY
                        )
                    )
                    break
                case 8:
                    this.game.level.elementList.add(
                        new Goal(this.positionX, this.positionY, this.game, this.sizeX, this.sizeY)
                    )
                    break
            }
        }
        // choose element
        if (this.isActive && !this.pressed && event.button === 2) {
            this.sizeX = 32
            this.sizeY = 32
            this.BlockType = Number(
                prompt(
                    "Type a number\n1: SolidBlock \n2: MovingPlatform\n3: JumpPad\n4: Spike\n5: Bubble\n6: Temporary Block\n7: Checkpoint\n8: Goal"
                )
            )
            if (this.BlockType === 1) {
                this.Sprite = Number(
                    prompt(
                        "Type a number\n1: Oben/links \n2: Oben\n3: Oben/Rechts\n4: Links/Oben/Unten\n5: Links\n6: Nichts\n7: Rechts\n8: Links/Rechts\n9: Links/Unten \n10: Unten\n11: Unten/Rechts\n12: Links/Unten/Rechts\n13: Oben/Links/Unten\n14: Unten/Oben\n15: Oben/Rechts/Unten"
                    )
                )
            }
            if (this.BlockType === 2) {
                this.sizeX = 64
                this.sizeY = 16
                this.speedX = Number(prompt("Speed X"))
                this.speedY = Number(prompt("Speed Y"))
                this.maxDistanceX = Number(prompt("maxDistanceX"))
                this.maxDistanceY = Number(prompt("maxDistanceY"))
            }
        }

        //remove element
        if (this.isActive && !this.pressed && event.button === 1) {
            var counter = 0
            for (const elementItem of this.game.level.elementList) {
                if (
                    this.mouse.x / 2 - this.game.camera.position.x >= elementItem.position.x &&
                    this.mouse.x / 2 - this.game.camera.position.x <=
                        elementItem.position.x + elementItem.width &&
                    this.mouse.y / 2 - this.game.camera.position.y >= elementItem.position.y &&
                    this.mouse.y / 2 - this.game.camera.position.y <=
                        elementItem.position.y + elementItem.height
                ) {
                    if (elementItem instanceof Player) {
                        return
                    }
                    this.level.elementList.delete(counter)
                }
                counter++
            }
        }

        this.pressed = true
    }

    leveltoConsole() {
        var output = ""
        for (const elementItem of this.game.level.elementList) {
            if (elementItem instanceof JumpPad) {
                output +=
                    "this.elementList.add(new JumpPad(" +
                    String(elementItem.position.x) +
                    "," +
                    String(elementItem.position.y) +
                    "," +
                    String(elementItem.width) +
                    "," +
                    String(elementItem.height) +
                    "))" +
                    "\n"
            } else if (elementItem instanceof TemporaryBlock) {
                output +=
                    "this.elementList.add(new TemporaryBlock(" +
                    String(elementItem.position.x) +
                    "," +
                    String(elementItem.position.y) +
                    "," +
                    String(elementItem.width) +
                    "," +
                    String(elementItem.height) +
                    "))" +
                    "\n"
            } else if (elementItem instanceof SolidBlock) {
                output +=
                    "this.elementList.add(new SolidBlock(" +
                    String(elementItem.position.x) +
                    "," +
                    String(elementItem.position.y) +
                    "," +
                    String(elementItem.width) +
                    "," +
                    String(elementItem.height) +
                    "," +
                    String(elementItem.type + 1) +
                    "))" +
                    "\n"
            } else if (elementItem instanceof Spike) {
                output +=
                    "this.elementList.add(new Spike(" +
                    String(elementItem.position.x) +
                    "," +
                    String(elementItem.position.y) +
                    "," +
                    String(elementItem.width) +
                    "," +
                    String(elementItem.height) +
                    "))" +
                    "\n"
            } else if (elementItem instanceof Checkpoint) {
                output +=
                    "this.elementList.add(new Checkpoint(" +
                    String(elementItem.position.x) +
                    "," +
                    String(elementItem.position.y) +
                    "," +
                    "this.game"
                "," + String(elementItem.width) + "," + String(elementItem.height) + "))" + "\n"
            } else if (elementItem instanceof Goal) {
                output +=
                    "this.elementList.add(new Goal" +
                    String(elementItem.position.x) +
                    "," +
                    String(elementItem.position.y) +
                    "," +
                    "this.game"
                "," + String(elementItem.width) + "," + String(elementItem.height) + "))" + "\n"
            } else if (elementItem instanceof Bubble) {
                output +=
                    "this.elementList.add(new Bubble(" +
                    String(elementItem.position.x) +
                    "," +
                    String(elementItem.position.y) +
                    "," +
                    String(elementItem.width) +
                    "," +
                    String(elementItem.height) +
                    "))" +
                    "\n"
            } else if (elementItem instanceof MovingPlatform) {
                output +=
                    "this.elementList.add(new MovingPlatform(" +
                    String(elementItem.position.x) +
                    "," +
                    String(elementItem.position.y) +
                    "," +
                    String(elementItem.width) +
                    "," +
                    String(elementItem.height) +
                    "," +
                    String(elementItem.velocity.x) +
                    "," +
                    String(elementItem.velocity.y) +
                    "," +
                    String(elementItem.maxX) +
                    "," +
                    String(elementItem.maxY) +
                    "," +
                    String(elementItem.traveledX) +
                    "," +
                    String(elementItem.traveledY) +
                    "))" +
                    "\n"
            }
        }
        console.log(output)
    }

    handleMouseMove(event) {
        const canvas = window.document.querySelector("canvas")
        var rect = canvas.getBoundingClientRect()
        this.mouse.x = event.clientX - rect.left
        this.mouse.y = event.clientY - rect.top
    }

    draw(ctx) {
        // set positions
        this.positionX =
            this.mouse.x / 2 -
            this.game.camera.position.x -
            ((this.mouse.x / 2 - this.game.camera.position.x) % 32)
        if (this.mouse.y / 2 - this.game.camera.position.y >= 0) {
            this.positionY =
                this.mouse.y / 2 -
                this.game.camera.position.y -
                ((this.mouse.y / 2 - this.game.camera.position.y) % 32)
        } else {
            this.positionY =
                this.mouse.y / 2 -
                this.game.camera.position.y -
                ((this.mouse.y / 2 - this.game.camera.position.y) % 32) -
                32
        }
        if (this.isActive) {
            ctx.beginPath()
            ctx.rect(this.positionX, this.positionY, this.sizeX, this.sizeY)
            ctx.fillStyle = "rgba(0,100,0,0.8)"
            ctx.fill()
            ctx.closePath()
        }
    }

    handleCollisionY(player) {
        return
    }

    handleCollisionX(player) {
        return
    }
}
