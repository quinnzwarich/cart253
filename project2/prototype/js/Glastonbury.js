class Glastonbury extends State {
  constructor() {
    super();
  }

  draw() {
    super.draw();
    this.drawTerrain();
    this.walk();
  }

  keyPressed() {
    super.keyPressed();
  }

  drawTerrain() {
    terrain.display();
  }

  walk() {
    if (keyIsDown(87) || keyIsDown(83)) {
      let previous = frameCount;
      this.wait.push(previous);
    }
    if (this.wait.length >= this.stepSize) {
      let gait = random(grassyFootsteps);
      gait.play();
      ir.process(gait);
      this.wait.splice(0, this.wait.length - 1);
    }
  }

}
