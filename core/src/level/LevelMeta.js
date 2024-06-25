export default class LevelMeta {
    constructor(name, src, planet, x, y) {
        this.name = name
        this.src = src
        this.planet = planet

        this.button = {
            position: {
                x: x,
                y: y,
            },
        }

        this.unlocked = false
        this.show = true
        this.data = this.parse()

        this.completed = this.data.best === Number.MAX_SAFE_INTEGER ? false : true
    }

    parse() {
        const item = localStorage.getItem(this.name)

        if (!item) {
            return {
                respawnPoint: {
                    x: Number.MAX_SAFE_INTEGER,
                    y: Number.MAX_SAFE_INTEGER,
                },
                camera: {
                    x: Number.MAX_SAFE_INTEGER,
                    y: Number.MAX_SAFE_INTEGER,
                },
                bgLayer: {
                    x: Number.MAX_SAFE_INTEGER,
                    y: Number.MAX_SAFE_INTEGER,
                },
                time: 0,
                deaths: 0,
                tutorialIndex: 0,
                best: Number.MAX_SAFE_INTEGER,
            }
        }

        return JSON.parse(item)
    }
}
