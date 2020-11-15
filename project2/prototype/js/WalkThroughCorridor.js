class WalkThroughCorridor extends State {
  constructor() {
    super();
    this.distance = 0;
    this.mod = 0;
    this.gait = [];
    this.footstep;
    this.seed = 1;
  }

  draw() {
    super.draw();
    this.modulateAudio();
    this.walk();
    this.checkIfOutOfCorridor();
  }

  keyPressed() {
    console.log(user.position);
    super.keyPressed();
    if (!under.isPlaying()) {
      under.loop();
    }
  }

  modulateAudio() {
    // rate slows as user progresses through the corridor
    this.distance = dist(user.position.x, user.position.z, 700, 100);
    this.mod = map(this.distance, 0, 1000, 0.5, 1);
    this.mod = constrain(this.mod, 0.5, 1);
    under.rate(this.mod);
  }

  walk() {
    // though the seed is increasing with each loop
    // it always seems to choose the same footstep
    randomSeed(this.seed);
    this.gait = ceil(random(0, 3));
    let footstep = footsteps[this.gait];
    if (keyIsDown(87) || keyIsDown(83)) {
      if (!footstep.isPlaying()) {
        footstep.play();
        this.seed++;
      }
    }
  }

  checkIfOutOfCorridor() {
    // this condition is somewhat lazy
    // but it is still useful to demonstrate what I generally plan to have happen
    if (user.position.x >= 650 && user.position.z <= 250) {
      currentState = new AndIllSeeYou();
    }
  }
}
