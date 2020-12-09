class State {
  constructor() {
    this.wait = [];
    this.stepSize = 15;
  }

  keyPressed() {
    if (!under.isPlaying()) {
      under.loop();
    }
  }

  draw() {
    background(0);
  }

  walk() {

  }
}
