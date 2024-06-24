import ElementList from "../element/elementList"
import Player from "../element/player"
import LevelEditor from "../element/levelEditor"
import SolidBlock from "../element/solidBlock"
import Spike from "../element/spike"
import JumpPad from "../element/jumpPad"
import TemporaryBlock from "../element/temporaryBlock"
import MovingPlatform from "../element/movingPlatform"
import Bubble from "../element/bubble"
import Checkpoint from "../element/checkpoint"
import Goal from "../element/goal"
import Particles from "../element/particle"
import Tutorial from "../element/tutorial"
import Sprite from "../element/sprite"
import Music from "../music/music"

export default class Level {
    constructor(meta, planet, game) {
        this.meta = meta
        this.game = game

        this.name = meta.name
        this.planet = planet
        this.gravity = 0.8

        this.elementList = new ElementList()
        this.tutorials = []
        this.tutorialIndex = 0

        let bgSrc = ""
        let bgTopSrc = ""
        
        switch (planet) {
            case "moon":
                bgSrc = "moon/bg.png"
                bgTopSrc = "moon/bg_top.png"
                break
            case "mars":
                bgSrc = "mars/bg.png"
                bgTopSrc = "mars/bg_top.png"
                break
            case "saturn":
                bgSrc = "saturn/bg.png"
                bgTopSrc = "saturn/bg_top.png"
                break
            default:
        }

        this.bgTop = new Sprite(bgTopSrc, 1024 * 2, 640 * 2, 1024 * 2, 640 * 2)
        this.bg = new Sprite(bgSrc, 1024, 640, 1024, 640)
        
        this.completed = false
    }

    async initLevel() { 
        await this.parse()
        this.elementList.add(new Player(0, 0, this.game))

        const temp = true
        if (temp) {
            this.elementList.add(new LevelEditor(this.game, this))
        }
        const music = new Music()
        music.startMusicLevel() 
    }

    loadLevel() {
        const player = this.elementList.getPlayer()

        if (
            this.meta.data.respawnPoint.x !== Number.MAX_SAFE_INTEGER &&
            this.meta.data.respawnPoint.y !== Number.MAX_SAFE_INTEGER
        ) {
            player.respawnPoint.x = this.meta.data.respawnPoint.x
            player.respawnPoint.y = this.meta.data.respawnPoint.y

            player.position.x = this.meta.data.respawnPoint.x
            player.position.y = this.meta.data.respawnPoint.y - this.gravity
        }

        player.deaths = this.meta.data.deaths

        if (
            this.meta.data.cameraPos.x !== Number.MAX_SAFE_INTEGER &&
            this.meta.data.cameraPos.y !== Number.MAX_SAFE_INTEGER &&
            this.meta.data.bgLayerPos.x !== Number.MAX_SAFE_INTEGER &&
            this.meta.data.bgLayerPos.y !== Number.MAX_SAFE_INTEGER
        ) {
            this.game.camera.position.x = this.meta.data.cameraPos.x
            this.game.camera.position.y = this.meta.data.cameraPos.y

            this.game.camera.bgLayer.position.x = this.meta.data.bgLayerPos.x
            this.game.camera.bgLayer.position.y = this.meta.data.bgLayerPos.y

            this.game.camera.save()
        }

        this.game.savedTime = this.meta.data.time
        this.tutorialIndex = this.meta.data.tutorialIndex

        this.insertTutorialBlocks()
    }

    drawBackground(ctx) {
        this.bg.draw(ctx, 0, 0, {
            x: 0,
            y: 0,
        })

        const highestX = Math.ceil(this.elementList.getHighestX() / 2048)

        for (let i = 0; i < highestX; i++) {
            this.bgTop.draw(
                ctx,
                0,
                0,
                {
                    x: 2048 * i - Math.abs(this.game.camera.bgLayer.position.x),
                    y: 0,
                },
                5
            )
        }
    }

    insertTutorialBlocks() {
        const amountTutorials = this.elementList.getAmountTutorial()

        if (amountTutorials === 0) return

        while (this.tutorials.length !== amountTutorials) {
            let min = Number.MAX_SAFE_INTEGER
            let tutorialItem = null

            for (const elementItem of this.elementList) {
                if (!(elementItem instanceof Tutorial) || this.tutorials.includes(elementItem))
                    continue

                if (elementItem.index < min) {
                    min = elementItem.index
                    tutorialItem = elementItem
                }
            }

            if (tutorialItem !== null) {
                this.tutorials.push(tutorialItem)
            }
        }

        this.tutorials[this.tutorialIndex].isActive = true
    }

    clean() {
        this.elementList = this.elementList.filter((element) => {
            return !(element instanceof Particles && !element.isActive)
        })
    }

    write() {
        const player = this.elementList.getPlayer()

        const prev = localStorage.getItem(this.name)

        let best = Number.MAX_SAFE_INTEGER
        const respawnPoint = {
            x: player.respawnPoint.x,
            y: player.respawnPoint.y,
        }

        if (prev) {
            const data = prev.split(",")
            best = data[9]
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
        let tutorialIndex = this.tutorialIndex
        let deaths = this.game.player.deaths

        if (this.completed) {
            respawnPoint.x = Number.MAX_SAFE_INTEGER
            respawnPoint.y = Number.MAX_SAFE_INTEGER
            cameraPos.x = Number.MAX_SAFE_INTEGER
            cameraPos.y = Number.MAX_SAFE_INTEGER
            bgLayer.x = Number.MAX_SAFE_INTEGER
            bgLayer.y = Number.MAX_SAFE_INTEGER
            time = 0
            deaths = 0
            tutorialIndex = 0
        }

        if (this.completed && parseFloat(this.game.time) < parseFloat(best)) {
            best = this.game.time
        }

        const newData = `${respawnPoint.x},${respawnPoint.y},${cameraPos.x},${cameraPos.y},${bgLayer.x},${bgLayer.y},${time},${deaths},${tutorialIndex},${best}`

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
            this.elementList.add(new Bubble(bubble.x, bubble.y, this.game))
        }

        for (const goal of levelObj.goal) {
            this.elementList.add(new Goal(goal.x, goal.y, this.game))
        }

        for (const movingPlattform of levelObj.movingPlattforms) {
            this.elementList.add(
                new MovingPlatform(
                    movingPlattform.x,
                    movingPlattform.y,
                    movingPlattform.vx,
                    movingPlattform.vy,
                    movingPlattform.mx,
                    movingPlattform.my,
                    movingPlattform.traveledX,
                    movingPlattform.traveledY,
                    movingPlattform.t
                )
            )
        }

        if (levelObj.tutorials) {
            for (const tutorial of levelObj.tutorials) {
                this.elementList.add(
                    new Tutorial(tutorial.x, tutorial.y, tutorial.txt, tutorial.i, this.game)
                )
            }
        }
    }
}
