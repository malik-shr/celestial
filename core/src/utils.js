export function toTime(seconds) {
    const date = new Date(null)
    date.setMilliseconds(seconds * 1000)
    return date.toISOString().substr(11, 10)
}
