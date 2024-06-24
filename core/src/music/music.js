export default class Music {
    constructor(){
        this.audioStartMenu = new Audio("musicData/Start.mp3");
        this.audioMainMenu =  new Audio("musicData/Main.mp3");
        this.audioStartLevel = new Audio("musicData/Start.mp3");
        this.audioMainLevel =  new Audio("musicData/Main.mp3");
        this.mute = false;
    }

    startMusicMenu(){
        this.audioStartLevel.pause();
        this.audioMainLevel.pause();
        this.audioStartLevel.currentTime = 0;
        this.audioMainLevel.currentTime = 0;
        
        if(this.mute) return;
        
        this.audioStartMenu.play();
        this.audioStartMenu.onended = () => {
            if(!this.mute) {
                this.audioMainMenu.loop = true;
                this.audioMainMenu.play();
            }
        };
    }

    startMusicLevel(){
        this.audioStartMenu.pause();
        this.audioMainMenu.pause();
        this.audioStartMenu.currentTime = 0;
        this.audioMainMenu.currentTime = 0;
        
        if(this.mute) return;
        
        this.audioStartLevel.play();
        this.audioStartLevel.onended = () => {
            if(!this.mute) {
                this.audioMainLevel.loop = true;
                this.audioMainLevel.play();
            }
        };
    }
    muteVolume(){
        this.mute = !this.mute
        this.audioStartMenu.pause()
        this.audioMainMenu.pause()
        this.audioStartLevel.pause()
        this.audioMainLevel.pause()
    }

}