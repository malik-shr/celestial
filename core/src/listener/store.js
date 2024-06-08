export const keysPressed = new Map([
    ["w", false],
    ["a", false],
    ["s", false],
    ["c", false],
    ["d", false],
    ["ArrowRight", false],
    ["ArrowLeft", false],
    ["ArrowUp", false],
    ["ArrowDown", false],
    [" ", false],
    ["Shift", false],
])

export const Screen = {
    Menu: Symbol("menu"),
    Game: Symbol("game"),
}

//
export let currentScreen = Screen.Menu

export function setCurrentScreen(screen) {
    currentScreen = screen
}
