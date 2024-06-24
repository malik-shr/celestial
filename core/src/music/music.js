export default class Music {
    constructor(){
        this.audioStartMenu = new Audio("musicData/Start.mp3");
        this.audioMainMenu =  new Audio("musicData/Main.mp3");
        this.audioStartLevel = new Audio("musicData/Start.mp3");
        this.audioMainLevel =  new Audio("musicData/Main.mp3");
        this.mute = false;
    }

    startMusicMenu(){
        this.audioStartLevel.pause()
        this.audioMainLevel.pause()
        if(this.mute === true){return}
        this.audioStartMenu.play()
        setTimeout((start) => {
            while(this.mute === false){
                this.audioMainMenu.play()
                setTimeout((loop) => { },106000)
            }
        },15000)
    }
    startMusicLevel(){
        this.audioStartMenu.pause()
        this.audioMainMenu.pause()
        if(this.mute === true){return}
        this.audioStartLevel.play()
        setTimeout((start) => {
            while(this.mute === false){
                this.audioMainLevel.play()
                setTimeout((Loop) => {},106000)
            }
        },15000)
    }
    muteVolume(){
        this.mute = !this.mute
        this.audioStartMenu.pause()
        this.audioMainMenu.pause()
        this.audioStartLevel.pause()
        this.audioMainLevel.pause()
    }

}