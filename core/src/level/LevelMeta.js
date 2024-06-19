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
        this.data = this.parse()
    }

    parse() {
        const item = localStorage.getItem(this.name)

        if (!item) {
            return {
                respawnPoint: {
                    x: Number.MAX_SAFE_INTEGER,
                    y: Number.MAX_SAFE_INTEGER,
                },
                cameraPos: {
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
                completed: false,
            }
        }

        const storage = item.split(",")

        return {
            respawnPoint: {
                x: parseFloat(storage[0]),
                y: parseFloat(storage[1]),
            },
            cameraPos: {
                x: parseFloat(storage[2]),
                y: parseFloat(storage[3]),
            },
            bgLayerPos: {
                x: parseFloat(storage[4]),
                y: parseFloat(storage[5]),
            },
            time: parseFloat(storage[6]),
            deaths: parseInt(storage[7]),
            tutorialIndex: parseInt(storage[8]),
            best: parseFloat(storage[9]),
            completed: parseFloat(storage[9]) === Number.MAX_SAFE_INTEGER ? false : true,
        }
    }
}
