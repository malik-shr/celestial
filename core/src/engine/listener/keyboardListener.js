export default class KeyboardListener{

    player

    constructor(player) {
        this.player = player
    }

    listen(event) {
        console.log(event)
        if(event.key === "ArrowRight") {
            this.player.x += 5 
        }
    
        if(event.key === "ArrowLeft") {
            this.player.x -= 5 
        }
    
        if(event.key === "ArrowDown") {
            this.player.y -= 5 
        }
    
        if(event.key === "ArrowDown") {
            this.player.y += 5 
        }
    }
}