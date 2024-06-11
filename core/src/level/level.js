import ElementList from "../element/elementList"
import Player from "../element/player"
import LevelEditor from "../element/levelEditor"
import { getLevelMetas } from "./levelMeta"
import SolidBlock from "../element/solidBlock"
import Spike from "../element/spike"
import JumpPad from "../element/jumpPad"
import TemporaryBlock from "../element/temporaryBlock"
import MovingPlatform from "../element/movingPlatform"
import Bubble from "../element/bubble"
import Checkpoint from "../element/checkpoint"

export default class Level {
    constructor(name, gravity = 0.8, planet, game) {
        this.name = name
        this.gravity = gravity
        this.planet = planet
        this.game = game

        this.elementList = new ElementList()

        this.completed = false

        this.meta = getLevelMetas()[this.name]

        this.loaded = false
    }

    async initLevel(meta) {
        //setLevelElements(this.game, this.elementList)[this.name].init()

        await this.parse()

        this.elementList.add(new Player(0, 0, this.game, this))
        this.elementList.add(new LevelEditor(this.game, this))
    }

    loadLevel(meta) {
        const player = this.getPlayer()

        if (
            meta.data.respawnPoint.x !== Number.MAX_SAFE_INTEGER &&
            meta.data.respawnPoint.y !== Number.MAX_SAFE_INTEGER
        ) {
            player.respawnPoint.x = meta.data.respawnPoint.x
            player.respawnPoint.y = meta.data.respawnPoint.y

            player.position.x = meta.data.respawnPoint.x
            player.position.y = meta.data.respawnPoint.y - this.gravity
        }

        if (
            meta.data.cameraPos.x !== Number.MAX_SAFE_INTEGER &&
            meta.data.cameraPos.y !== Number.MAX_SAFE_INTEGER &&
            meta.data.bgLayerPos.x !== Number.MAX_SAFE_INTEGER &&
            meta.data.bgLayerPos.y !== Number.MAX_SAFE_INTEGER
        ) {
            this.game.camera.position.x = meta.data.cameraPos.x
            this.game.camera.position.y = meta.data.cameraPos.y

            this.game.camera.bgLayer.position.x = meta.data.bgLayerPos.x
            this.game.camera.bgLayer.position.y = meta.data.bgLayerPos.y

            this.game.camera.save()
        }

        this.game.savedTime = meta.data.time
    }

    getPlayer() {
        for (const element of this.elementList) {
            if (element instanceof Player) {
                return element
            }
        }

        return null
    }

    write() {
        const player = this.getPlayer()

        const prev = localStorage.getItem(this.name)

        let best = Number.MAX_SAFE_INTEGER
        const respawnPoint = {
            x: player.respawnPoint.x,
            y: player.respawnPoint.y,
        }

        if (prev) {
            const data = prev.split(",")
            best = data[7]
        }

        const cameraPos = {
            x: this.game.camera.previous.position.x,
            y: this.game.camera.previous.position.y,
        }

        const bgLayer = {
            x: this.game.camera.previous.bgLayer.position.x,
            y: this.game.camera.previous.bgLayer.position.x,
        }

        let time = this.game.time

        if (this.completed) {
            respawnPoint.x = Number.MAX_SAFE_INTEGER
            respawnPoint.y = Number.MAX_SAFE_INTEGER
            cameraPos.x = Number.MAX_SAFE_INTEGER
            cameraPos.y = Number.MAX_SAFE_INTEGER
            bgLayer.x = Number.MAX_SAFE_INTEGER
            bgLayer.y = Number.MAX_SAFE_INTEGER
            time = 0
        }

        if (this.completed && parseFloat(this.game.time) < parseFloat(best)) {
            best = this.game.time
        }

        const newData = `${respawnPoint.x},${respawnPoint.y},${cameraPos.x},${cameraPos.y},${bgLayer.x},${bgLayer.y},${time},${best}`

        localStorage.setItem(this.name, newData)
    }

    async parse() {
        const response = await fetch(this.meta.src)
        const levelObj = await response.json()

        for (const checkpoint of levelObj.checkpoints) {
            this.elementList.add(new Checkpoint(checkpoint.x, checkpoint.y, this.game))
        }

        for (const jumppad of levelObj.jumppads) {
            this.elementList.add(new JumpPad(jumppad.x, jumppad.y))
        }

        for (const solidBlock of levelObj.solidBlocks) {
            this.elementList.add(
                new SolidBlock(solidBlock.x, solidBlock.y, solidBlock.t, this.planet)
            )
        }

        for (const tempBlock of levelObj.temporaryBlocks) {
            this.elementList.add(new TemporaryBlock(tempBlock.x, tempBlock.y))
        }

        for (const spike of levelObj.spikes) {
            this.elementList.add(new Spike(spike.x, spike.y, spike.w, spike.h, spike.t))
        }

        for (const bubble of levelObj.bubbles) {
            this.elementList.add(new Bubble(bubble.x, bubble.y))
        }
        for (const movingPlattform of levelObj.movingPlattforms) {
            this.elementList.add(
                new MovingPlatform(
                    movingPlattform.x,
                    movingPlattform.y,
                    movingPlattform.w,
                    movingPlattform.h,
                    movingPlattform.vx,
                    movingPlattform.vy,
                    movingPlattform.mx,
                    movingPlattform.my,
                    movingPlattform.traveledX,
                    movingPlattform.traveledY
                )
            )
        }
    }
}
