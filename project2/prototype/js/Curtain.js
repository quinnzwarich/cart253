class Curtain {
  constructor(x, z, rotation) {
    this.x = x;
    this.z = z;
    this.noiseScale = 0.2;
    this.polygons = undefined;
    this.rotation = rotation;
    this.noiseArray = [];
  }

  drawCurtain() {

  }

  // if horizontal, rotate by PI / 2
  // if vertical, rotate by PI
  display() {
    push();
    translate(width / 2, -height * 1.5);
    rotateY(this.rotation);
    this.drawCurtain();
    pop();
  }
}
