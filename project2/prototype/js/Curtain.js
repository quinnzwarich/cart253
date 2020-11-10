class Curtain {
  constructor(x, z, rotation) {
    this.x = x;
    this.z = z;
    this.noiseScale = 0.2;
    this.polygons = undefined;
    // this.positionsI = [];
    // this.positionsJ = [];
    this.rotation = rotation;
    this.red = 0;
    this.invertRed = 0;
  }

  drawCurtain() {

  }

  // if horizontal, rotate by PI / 2
  // if vertical, rotate by PI
  display() {
    push();
    translate(width / 2, -height / 2);
    rotateY(this.rotation);
    this.drawCurtain();
    pop();
  }
}
