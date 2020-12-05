class State {
  constructor() {
    this.wait = [];
    this.stepInX = [550];
    this.stepInZ = [1100];
    this.stepSize = 0;
  }

  keyPressed() {

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

  walk() {
    // the idea is for footsteps to happen when the user traverses a certain distance
    // I am using arrays that count the pixels traversed across either the x or z plane to do this
    // pixels traversed across either plane count towards the same total,
    // because of this I am altering the total required based on the approximate direction
    let integer = floor(user.pan);
    let increment = (user.pan - integer);
    this.stepSize = lerp(25, 35, increment);

    let previousX = floor(user.position.x);
    let previousZ = floor(user.position.z);

    for (let i = 0; i < this.stepInX.length; i++) {
      if (previousX < this.stepInX[this.stepInX.length - 1] ||
          previousX > this.stepInX[this.stepInX.length - 1]) {
        this.stepInX.push(previousX);
        this.wait.push(previousX);
      }
    }
    for (let i = 0; i < this.stepInZ.length; i++) {
      if (previousZ < this.stepInZ[this.stepInZ.length - 1] ||
          previousZ > this.stepInZ[this.stepInZ.length - 1]) {
        this.stepInZ.push(previousZ);
        this.wait.push(previousZ);
      }
    }
    if (this.wait.length >= this.stepSize) {
      let gait = random(footsteps);
      gait.play();
      ir.process(gait);
      this.wait.splice(0, this.wait.length - 1);
      this.stepInX.splice(0, this.stepInX.length - 2);
      this.stepInZ.splice(0, this.stepInZ.length - 2);
    }
  }
}
