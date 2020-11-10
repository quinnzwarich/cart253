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

    // in the documentation, this is actually called rollof
    // of course it doesn't recognize that as a function
    // it also doesn't describe any number range which it accepts
    this.panning.rolloff(2);

    // the documentation also references something called the audio context listener
    // though I'm not sure how to access it as its methods from the MDN web docs aren't recognized 
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
