class VerticalWall extends Curtain {
  constructor(x, z) {
    super(x, z);
    this.polygons = (columns * 100);
  }

  display() {
    push();
    translate(width / 2, -height / 2);
    rotateY(PI / 2);
    this.drawCurtain();
    pop();
  }
}
