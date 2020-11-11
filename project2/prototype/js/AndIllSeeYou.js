class AndIllSeeYou extends State {
  constructor() {
    super();
    this.gait = [];
    this.footstep;
    this.seed = 1;
  }

  draw() {
    super.draw();
    this.walk();
  }

  keyPressed() {
    super.keyPressed();
    if (!trees.isPlaying()) {
      trees.play();
      under.setVolume(0);
    }
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
}
