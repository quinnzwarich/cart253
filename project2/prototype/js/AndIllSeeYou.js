class AndIllSeeYou extends State {
  constructor() {
    super();
    this.gait = [];
    this.footstep;
    this.seed = 1;
    this.lights = 4;
    this.transparency = 0;
  }

  draw() {
    super.draw();
    this.walk();
    this.displayVideo();
  }

  keyPressed() {
    super.keyPressed();

    if (!under.isPlaying()) {
      under.loop();
    }
  }

  strobe() {
    this.transparency
  }

  displayVideo() {
    redroomScene.play();

    push();
    noStroke();
    translate(user.position.x, user.position.y, user.position.z);
    rotateY(PI - user.pan);
    tint(255, 100);
    texture(redroomScene);
    box(this.userSize, height/12, this.userSize);
    pop();
  }
}
