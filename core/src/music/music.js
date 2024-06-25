export default class Music {
    constructor() {
        this.mainMusic = new Audio("musicData/mainMusic.mp3")
        this.jumppadSound = new Audio("musicData/Jumppad.mp3")
        this.dashSound = new Audio("musicData/Dash.mp3")
        this.bubbleSound = new Audio("musicData/Coin.mp3")
        this.deadSound = new Audio("musicData/Death.mp3")

        this.bubbleSound.volume = 0.5
        this.jumppadSound.volume = 0.8
        this.dashSound.volume = 0.8

        this.mute = this.get()
    }

    startMusic() {
        if (this.mute) return

        this.mainMusic.currentTime = 0

        if (!this.mute) {
            this.mainMusic.loop = true
            this.mainMusic.play()
        }
    }

    startLevelMusic() {
        this.mainMusic.volume = 0.15
        this.startMusic()
    }

    startMenuMusic() {
        this.mainMusic.volume = 0.25
        this.startMusic()
    }

    playSound(sound) {
        if (this.mute) return

        sound.currentTime = 0

        sound.play()
    }

    muteVolume() {
        if (!this.mute) {
            this.mute = true
            localStorage.setItem("sound", false)
            this.mainMusic.pause()
            return
        }

        this.mute = false
        localStorage.setItem("sound", true)
    }

    get() {
        const savedItem = localStorage.getItem("sound")

        if (savedItem) return !JSON.parse(savedItem)

        return false
    }
}
