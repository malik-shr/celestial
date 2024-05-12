const TokenTypes = Object.freeze({
    Player: "Player",
    SolidBlock: "SolidBlock",
    Air: "Air",
    Illegal: "Illegal",
})

export default class LevelParser {
    constructor(input) {
        this.input = input
        this.createTokens()
        this.tokens = []
        this.position = 0
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
}
