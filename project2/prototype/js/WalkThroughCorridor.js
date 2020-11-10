class WalkThroughCorridor extends State {
  constructor() {
    super();
    this.distance = 0;
    this.mod = 0;
    this.gait = [];
    this.seed = 0;
    this.panning = new p5.Panner3D();
  }

  draw() {
    super.draw();
    this.modulateAudio();
    this.positionAudio();
    this.walk();
  }

  keyPressed() {
    super.keyPressed();
    if (!under.isPlaying()) {
      under.loop();
    }
  }

  modulateAudio() {
    this.distance = dist(user.position.x, user.position.z, 700, 100);
    this.mod = map(this.distance, 0, 1000, 0.5, 1);
    this.mod = constrain(this.mod, 0.5, 1);
    under.rate(this.mod);
  }

  positionAudio() {
    this.panning.process(under);
    this.panning.set(700, 150, 100);
  }

  walk() {
    randomSeed(this.seed);
    this.gait = random(footsteps)

    if (keyIsDown(87) || keyIsDown(83) || keyIsDown(65) || keyIsDown(68)) {
      if (!this.gait.isPlaying()) {
        this.gait.play();
        this.seed++;
      }
    }
  }

  checkIfOutOfCorridor() {

  }
}
