class State {
  constructor() {
    this.wait = [];
    this.stepSize = 30;
  }

  keyPressed() {
    if (!under.isPlaying()) {
      under.loop();
    }
  }

  draw() {}

  walk() {}
}
