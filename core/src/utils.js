export function toTime(seconds) {
    const date = new Date(null)
    date.setMilliseconds(seconds * 1000)
    return date.toISOString().substr(11, 10)
}

// https://stackoverflow.com/a/30137201
export function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
    const paragraphs = text.split("\n")
    const textLines = []

    // Loop through paragraphs
    for (let p = 0; p < paragraphs.length; p++) {
        let line = ""
        const words = paragraphs[p].split(" ")
        // Loop through words
        for (let w = 0; w < words.length; w++) {
            const testLine = line + words[w] + " "
            const metrics = ctx.measureText(testLine)
            const testWidth = metrics.width
            // Make a line break if line is too long
            if (testWidth > maxWidth) {
                textLines.push(line.trim())
                line = words[w] + " "
            } else {
                line = testLine
            }
        }
        textLines.push(line.trim())
    }

    // Render text on canvas
    for (let tl = 0; tl < textLines.length; tl++) {
        ctx.fillText(textLines[tl], x, y)
        y += lineHeight
    }
}
