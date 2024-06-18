class LevelMeta {
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
                tuturialIndex: 0,
                best: Number.MAX_SAFE_INTEGER,
                completed: false,
            }
        }

        const storage = item.split(",")

        console.log(storage[8])

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
            tuturialIndex: parseInt(storage[7]),
            best: parseFloat(storage[8]),
            completed: parseFloat(storage[8]) === Number.MAX_SAFE_INTEGER ? false : true,
        }
    }
}

export default class LevelList {
    constructor() {
        this.levelMetas = []
    }

    get(name) {
        // Always reassign levelMetas to get actual data of local storage
        this.refresh()
        return this.levelMetas.find((item) => item.name === name)
    }

    getLevelPlanets(planet) {
        this.refresh()
        return this.levelMetas.filter((item) => item.planet === planet)
    }

    refresh() {
        this.levelMetas = [
            new LevelMeta("Level 1", "levels/level1.json", "moon", 400, 310),
            new LevelMeta("Level 2", "levels/level2.json", "moon", 500, 280),
            new LevelMeta("Level 3", "levels/level3.json", "moon", 580, 360),

            new LevelMeta("Level 4", "levels/level4.json", "mars", 400, 320),
            new LevelMeta("Level 5", "levels/level5.json", "mars", 490, 390),
            new LevelMeta("Level 6", "levels/level6.json", "mars", 580, 380),

            new LevelMeta("Level 7", "levels/level7.json", "saturn", 400, 320),
            new LevelMeta("Level 8", "levels/level8.json", "saturn", 500, 350),
        ]

        let previousUnlocked = true
        for (const levelMeta of this.levelMetas) {
            if (previousUnlocked) {
                levelMeta.unlocked = true
            }

            if (levelMeta.data.completed) {
                previousUnlocked = true
            } else {
                previousUnlocked = false
            }
        }
    }
}
