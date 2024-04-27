const TokenTypes = Object.freeze({
    Player: "Player",
    SolidBlock: "SolidBlock",
    Air: "Air",
    Illegal: "Illegal",
})

export default class LevelParser {
    tokens = []
    position = 0

    constructor(input) {
        this.input = input
        this.createTokens()
    }

    createTokens() {
        let rows = this.input.split("\n")

        // Remove first two rows because they are empty
        rows = rows.slice(1, -1)

        console.log(rows)

        for (let y = 0; y < rows.length; y++) {
            const row = rows[y]

            let x = -1
            let position = 0

            while (position < row.length) {
                const character = row[position]
                switch (character) {
                    case "p":
                        this.createToken(TokenTypes.Player, ++x, y)
                        break
                    case "b":
                        this.createToken(TokenTypes.SolidBlock, ++x, y)
                        break
                    case "-":
                        this.createToken(TokenTypes.Air, ++x, y)
                        break
                    case " ":
                        break
                }

                ++position
            }
        }

        console.log(this.tokens)
    }

    createToken(type, x, y) {
        this.tokens.push({ type, x, y })
    }

    loadLevel() {
        let levelTemp = this.level
        let linesY = levelTemp.split("#br")
        let blockX = linesY.split["#"]
        let numLines = levelTemp.length
        let levelMap = []
        for (let i = 0; i < 16; i++) {
            levelMap.push(
                posX,
                i,
                [] //air token hinzufügen
            )
            if (i < 16 - numLines) {
            } else {
            }
        }
    }
}
