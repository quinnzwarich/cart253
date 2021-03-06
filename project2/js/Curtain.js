class Curtain {
  constructor(x, z, rotation, i) {
    this.x = x;
    this.z = z;
    this.noiseScale = 0.2;
    this.rotation = rotation;
    this.i = i;
    this.noiseArray = [];
    this.nextArray = [];
  }

  drawCurtain() {}

  // if horizontal, rotate by PI / 2
  // if vertical, rotate by PI
  display() {
    push();
    translate(width / 2, -height * 1.5);
    rotateY(this.rotation);
    this.drawCurtain(transparency);
    pop();
  }
}
