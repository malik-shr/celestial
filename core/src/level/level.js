export default class Level{
    
    // TODO extend level class
    name
    elementList

    constructor(name, elementList) {
        this.name = name
        this.elementList = elementList
    }

     // Draws each element of the element list
    draw(ctx) {
        this.elementList.draw()
    }
}