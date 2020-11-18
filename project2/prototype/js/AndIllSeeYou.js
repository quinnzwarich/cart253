class AndIllSeeYou extends State {
  constructor() {
    super();
    this.gait = [];
    this.footstep;
    this.seed = 1;
    this.lights = 4;
  }

  draw() {
    super.draw();
    this.walk();
    this.trees();
  }

  keyPressed() {
    console.log(user.position);
    super.keyPressed();
  }

  trees() {
    redroom.play();
    this.strobe = random(0, 255);

    blendMode(ADD);
    push();
    noStroke();
    translate(width / 2, -height);
    translate(600, 400, 550);
    tint(255, 100);
    texture(redroom);
    box(1000);
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
}
