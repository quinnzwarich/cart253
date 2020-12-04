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

    // draw bust
    push();
    directionalLight(255, 255, 255, -width, height, 0);
    noStroke();
    scale(0.1);
    translate(5500, 2750, 1000);
    rotateX(PI);
    rotateY(PI * 0.875);
    model(venus);
    pop();
  }

  keyPressed() {
    console.log(user.pan);
  }
}
