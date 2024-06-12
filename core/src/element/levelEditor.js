import Element from "./element"
import { keysPressed } from "../listener/store"

import Player from "./player"
import Checkpoint from "./checkpoint"
import JumpPad from "./jumpPad"
import MovingPlatform from "./movingPlatform"
import SolidBlock from "./solidBlock"
import TemporaryBlock from "./temporaryBlock"
import Spike from "./spike"
import Goal from "./goal"
import Bubble from "./bubble"

export default class LevelEditor extends Element {
    constructor(game, level) {
        super(0, 0)
        this.game = game
        this.level = level

        this.mouse = { x: 0, y: 0 }
        this.isActive = false

        this.BlockType = 1
        this.sizeX = 32
        this.sizeY = 32
        this.speedX = 1
        this.speedY = 0
        this.blockType = 6
        this.spikeType = 1

        window.addEventListener("mousemove", (event) => this.handleMouseMove(event))
        window.addEventListener("mousedown", (event) => this.handleMouseDown(event))

        window.addEventListener("keyup", (event) => {
            if (event.key === "Control" && !this.pressed) {
                if (!this.isActive) {
                    this.isActive = true
                } else {
                    this.isActive = false
                }
                if (keysPressed.get("c")) {
                    console.log("Copied")
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
        let y = this.positionY
        let x = this.positionX
        let width = 32
        let height = 32

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
                    if (this.blockType <= 0 || this.blockType > 15) {
                        console.log("INVALID TYPE")
                        break
                    }

                    this.game.level.elementList.add(
                        new SolidBlock(
                            this.positionX,
                            this.positionY,
                            this.blockType,
                            this.game.level.planet
                        )
                    )
                    break
                case 2:
                    this.game.level.elementList.add(
                        new MovingPlatform(
                            this.positionX,
                            this.positionY,
                            this.speedX,
                            this.speedY,
                            this.maxDistanceX,
                            this.maxDistanceY
                        )
                    )
                    break
                case 3:
                    this.game.level.elementList.add(new JumpPad(this.positionX, this.positionY))
                    break
                case 4:
                    switch (this.spikeType) {
                        case 1:
                            y += 32 - 24
                            height = 24
                            break
                        case 2:
                            x += 32 - 24
                            width = 24
                            break
                        case 3:
                            width = 24
                            break
                        case 4:
                            height = 24
                            break
                        default:
                    }

                    if (this.spikeType <= 0 || this.spikeType > 4) {
                        console.log("Invalid Type")
                        break
                    }
                    this.game.level.elementList.add(new Spike(x, y, width, height, this.spikeType))
                    break
                case 5:
                    this.game.level.elementList.add(new Bubble(this.positionX, this.positionY))
                    break
                case 6:
                    this.game.level.elementList.add(
                        new TemporaryBlock(this.positionX, this.positionY)
                    )
                    break
                case 7:
                    this.game.level.elementList.add(
                        new Checkpoint(this.positionX, this.positionY, this.game)
                    )
                    break
                case 8:
                    this.game.level.elementList.add(
                        new Goal(this.positionX, this.positionY, this.game)
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
                this.blockType = Number(
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
            if (this.BlockType === 4) {
                this.spikeType = Number(
                    prompt("Type a number\n1: oben \n2: links\n3: rechts\n4: unten\n")
                )
            }
        }

        //remove element
        if (this.isActive && !this.pressed && event.button === 1) {
            let counter = 0
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
        const obj = {
            solidBlocks: [],
            temporaryBlocks: [],
            jumppads: [],
            spikes: [],
            checkpoints: [],
            bubbles: [],
            movingPlattforms: [],
            goal: [],
        }

        for (const elementItem of this.game.level.elementList) {
            if (
                elementItem instanceof SolidBlock &&
                !(elementItem instanceof JumpPad) &&
                !(elementItem instanceof TemporaryBlock)
            ) {
                obj.solidBlocks.push({
                    x: elementItem.position.x,
                    y: elementItem.position.y,
                    t: elementItem.type + 1,
                })
            }
            if (elementItem instanceof TemporaryBlock) {
                obj.temporaryBlocks.push({ x: elementItem.position.x, y: elementItem.position.y })
            }
            if (elementItem instanceof JumpPad) {
                obj.jumppads.push({ x: elementItem.position.x, y: elementItem.position.y })
            }
            if (elementItem instanceof Spike) {
                obj.spikes.push({
                    x: elementItem.position.x,
                    y: elementItem.position.y,
                    w: elementItem.width,
                    h: elementItem.height,
                    t: elementItem.type,
                })
            }
            if (elementItem instanceof Checkpoint) {
                obj.checkpoints.push({ x: elementItem.position.x, y: elementItem.position.y })
            }
            if (elementItem instanceof Bubble) {
                obj.bubbles.push({ x: elementItem.position.x, y: elementItem.position.y })
            }
            if (elementItem instanceof MovingPlatform) {
                obj.movingPlattforms.push({
                    x: elementItem.position.x,
                    y: elementItem.position.y,
                    vx: elementItem.velocity.x,
                    vy: elementItem.velocity.y,
                    mx: elementItem.maxX,
                    my: elementItem.maxY,
                    traveledX: elementItem.traveledX,
                    traveledY: elementItem.traveledY,
                })
            }
            if (elementItem instanceof Goal) {
                obj.goal.push({ x: elementItem.position.x, y: elementItem.position.y })
            }
        }

        console.log(obj)
        navigator.clipboard.writeText(JSON.stringify(obj))
    }

    handleMouseMove(event) {
        const canvas = window.document.querySelector("canvas")
        const rect = canvas.getBoundingClientRect()
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
