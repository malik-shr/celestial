import { getGodModeMeta } from "../utils"
import LevelMeta from "./LevelMeta"

export default class LevelList {
    constructor() {
        this.levelMetas = []

        this.stats = {
            moon: {
                totalBestTime: 0,
                averageTime: 0,
            },
            mars: {
                totalBestTime: 0,
                averageTime: 0,
            },
            saturn: {
                totalBestTime: 0,
                averageTime: 0,
            },
            overall: {
                totalBestTime: 0,
                averageTime: 0,
            },
        }
    }

    get(name) {
        // Always reassign levelMetas to get actual data of local storage
        this.refresh()

        if (name === "GODMODE") {
            return getGodModeMeta()
        }

        return this.levelMetas.find((item) => item.name === name)
    }

    getLevelPlanets(planet) {
        this.refresh()
        return this.levelMetas.filter((item) => item.planet === planet)
    }

    refresh() {
        this.levelMetas = [
            new LevelMeta("Level 1", "levels/level1.json", "moon", 400, 340),
            new LevelMeta("Level 2", "levels/level2.json", "moon", 500, 310),
            new LevelMeta("Level 3", "levels/level3.json", "moon", 580, 400),

            new LevelMeta("Level 4", "levels/level4.json", "mars", 380, 350),
            new LevelMeta("Level 5", "levels/level5.json", "mars", 440, 400),
            new LevelMeta("Level 6", "levels/level6.json", "mars", 520, 430),
            new LevelMeta("Level 7", "levels/level7.json", "mars", 600, 420),

            new LevelMeta("Level 8", "levels/level8.json", "saturn", 400, 380),
            new LevelMeta("Level 9", "levels/level9.json", "saturn", 460, 360),
        ]

        let previousUnlocked = true
        for (const levelMeta of this.levelMetas) {
            if (previousUnlocked) {
                levelMeta.unlocked = true
            }

            if (levelMeta.completed) {
                previousUnlocked = true
            } else {
                previousUnlocked = false
            }
        }
    }

    refreshStats() {
        this.refresh()
        const planets = ["moon", "mars", "saturn"]

        this.stats = {
            moon: {
                totalBestTime: 0,
                averageTime: 0,
            },
            mars: {
                totalBestTime: 0,
                averageTime: 0,
            },
            saturn: {
                totalBestTime: 0,
                averageTime: 0,
            },
            overall: {
                totalBestTime: 0,
                averageTime: 0,
            },
        }

        for (const planet of planets) {
            if (this.shouldShowStatsPlanet(planet)) {
                for (const levelMeta of this.getLevelPlanets(planet)) {
                    this.stats[planet].totalBestTime += parseFloat(levelMeta.data.best)
                    this.stats.overall.totalBestTime += parseFloat(levelMeta.data.best)
                }
            }
        }

        let totalLevelCount = 0

        for (const planet of planets) {
            this.stats[planet].averageTime =
                this.stats[planet].totalBestTime / this.getLevelPlanets(planet).length
            totalLevelCount += this.getLevelPlanets(planet).length
        }

        this.stats.overall.averageTime = this.stats.overall.totalBestTime / totalLevelCount
    }

    completedAll() {
        for (const levelMeta of this.levelMetas) {
            if (!levelMeta.completed) {
                return false
            }
        }

        return true
    }

    shouldShowStatsPlanet(planet) {
        const planetMetas = this.getLevelPlanets(planet)

        for (const levelMeta of planetMetas) {
            if (!levelMeta.completed) {
                return false
            }
        }

        return true
    }
}
