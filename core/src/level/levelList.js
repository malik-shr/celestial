import { initElementList1 } from "./level1"
import { initElementList2 } from "./level2"
import { initElementList3 } from "./level3"

export function getLevels(game) {
    return {
        level1: {
            name: "Level 1",
            planet: "moon",
            elementList: initElementList1(game),
        },
        level2: {
            name: "Level 2",
            planet: "moon",
            elementList: initElementList2(game),
        },
        level3: {
            name: "Level 3",
            planet: "moon",
            elementList: initElementList3(game),
        },
    }
}
