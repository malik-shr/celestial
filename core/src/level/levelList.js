import { level1 } from "./level1"

// Singleton Class
export default class LevelList extends Map {
    constructor() {
        super()
        this.initLevels()
    }

    add(level) {
        this.set(level.name, level)
    }

    initLevels() {
        this.add(level1)
    }
}
