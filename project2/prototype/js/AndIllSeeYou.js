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
    this.displayVideo();
  }

  keyPressed() {
    console.log(user.position);
    super.keyPressed();
  }

  displayVideo() {
    redroom.play();

    push();
    noStroke();
    translate(user.position.x, user.position.y, user.position.z);
    rotateY(PI - user.pan);
    tint(255, 100);
    texture(redroom);
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
}
