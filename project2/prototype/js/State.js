class State {
  constructor() {

  }

  draw() {
    background(0);

    for (let i = 0; i < tiles.length; i++) {
      let tile = tiles[i];
      tile.display();
    }

    for (let i = 0; i < curtains.length; i++) {
      let curtain = curtains[i];
      curtain.display();
    }
  }

  keyPressed() {

  }
}
