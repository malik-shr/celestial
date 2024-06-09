import { initElementList1 } from "./level1"
import { initElementList2 } from "./level2"
import { initElementList3 } from "./level3"

class LevelMeta {
    constructor(name, planet) {
        this.name = name
        this.planet = planet

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
                best: Number.MAX_SAFE_INTEGER,
            }
        }

        const data = item.split(",")

        return {
            respawnPoint: {
                x: parseFloat(data[0]),
                y: parseFloat(data[1]),
            },
            cameraPos: {
                x: parseFloat(data[2]),
                y: parseFloat(data[3]),
            },
            bgLayerPos: {
                x: parseFloat(data[4]),
                y: parseFloat(data[5]),
            },
            time: parseFloat(data[6]),
            best: parseFloat(data[7]),
        }
    }
}

export function getLevelMetas() {
    return {
        "Level 1": new LevelMeta("Level 1", "moon"),
        "Level 2": new LevelMeta("Level 2", "moon"),
        "Level 3": new LevelMeta("Level 3", "mars"),
    }
}

export function setLevelElements(game, elementlist) {
    return {
        "Level 1": {
            init: () => initElementList1(game, elementlist),
        },
        "Level 2": {
            init: () => initElementList2(game, elementlist),
        },
        "Level 3": {
            init: () => initElementList3(game, elementlist),
        },
    }
}
