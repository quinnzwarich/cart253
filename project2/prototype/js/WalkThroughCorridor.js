class WalkThroughCorridor extends State {
  constructor() {
    super();
    this.distance = 0;
    this.mod = 0;
    this.gait = [];
    this.footstep;
    this.seed = 1;
    this.playback = 0;
  }

  draw() {
    super.draw();
    this.displayVideo();
    this.modulateVideo();
    this.modulateAudio();
    this.walk();
    this.checkIfOutOfCorridor();
  }

  keyPressed() {
    console.log(this.distance);
    super.keyPressed();

    if (!under.isPlaying()) {
      under.loop();
    }
  }

  modulateVideo() {
    if (corridorScene.duration() > 0) {
      this.playback = map(this.distance, 1011, 0, 0, corridorScene.duration());
      corridorScene.time(this.playback);
    }
  }

  modulateAudio() {
    // rate slows as user progresses through the corridor
    this.distance = dist(user.position.x, user.position.z, 700, 100);
    this.mod = map(this.distance, 0, 1011, 0.5, 1);
    this.mod = constrain(this.mod, 0.5, 1);
    under.rate(this.mod);
  }

  displayVideo() {
    blendMode(ADD);

    push();
    noStroke();
    translate(user.position.x, user.position.y, user.position.z);
    rotateY(PI - user.pan);
    tint(255, 100);
    texture(corridorScene);
    box(width/12, height/12, width/12);
    pop();
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
        ir.process(footstep);
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
