class WalkThroughCorridor extends State {
  constructor() {
    super();
    this.roomDistance = 0;
    this.corridorDistance = 0;
    this.audioMod = 0;
    this.videoMod = 0;
    this.userSize = width/12;
    this.lastPosition = createVector((width / 18) * 11, 150, (rows * 50) - 100);
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
    super.keyPressed();
    console.log(this.stepSize);
    if (!under.isPlaying()) {
      under.loop();
    }
  }

  modulateVideo() {
    if (corridorScene.duration() > 0) {
      this.corridorDistance = dist(user.position.x, user.position.z, 550, 100);
      this.videoMod = map(this.corridorDistance, 1000, 0, 0, corridorScene.duration());
      this.videoMod = constrain(this.videoMod, 0, corridorScene.duration());
      corridorScene.time(this.videoMod);
    }
  }

  modulateAudio() {
    // rate slows corresponding to position within room
    this.roomDistance = dist(user.position.x, user.position.z, 1050, 600);
    this.audioMod = map(this.roomDistance, 0, 848.5, 0.5, 1);
    this.audioMod = constrain(this.audioMod, 0.5, 1);
    under.rate(this.audioMod);
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

  checkIfOutOfCorridor() {
    // this condition is somewhat lazy
    // but it is still useful to demonstrate what I generally plan to have happen
    if (user.position.x >= 650 && user.position.z <= 250) {
      currentState = new AndIllSeeYou();
    }
  }
}
