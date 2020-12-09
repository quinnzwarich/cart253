class End extends State {
  constructor() {
    super();
  }

  draw() {
    super.draw();
    this.drawLaura();
  }

  // surprise !
  drawLaura() {
    push();
    noStroke();
    translate(user.position.x, user.position.y, user.position.z);
    rotateY(PI - user.pan);
    tint(255, 255);
    texture(laura);
    box(this.userSize, height/12, this.userSize);
    pop();
  }
}
