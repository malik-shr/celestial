#import "@preview/pintorita:0.1.1"

#show raw.where(lang: "pintora"): it => pintorita.render(it.text)

#align(center)[= Projektaufbau] 
#v(40pt, weak: true)

#image("uml.png")

#v(10pt)

#pagebreak()
== Bsp. GameLoop
#v(10pt)

```javascript
player = new Player()
gameEngine = new Engine()
graphics = new GraphicsPipeline(player)
tickListener = new TickListener(engine, player)
keyboardListener = new KeyboardListener()

startTime

tick = 50 //ms 20 x pro Sekunde

addEventListener() {
  keyboardListener().doSomething()
}

while() {
  if(startTime % tick === 0) {
    gameEngine.engine()
    // Berechnet in jedem Frame z.B aktuelle Position Spieler den States

    // z.B Jumping Physik dauert 5 Frames

    graphicsEngine().render()
    // Rendert das Spielgeschehen in Abhängigkeit von den States
    // css
  }
}
```

