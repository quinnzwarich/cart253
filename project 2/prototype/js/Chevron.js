class Chevron {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 100;
    this.height = 50;
    this.offset = 25;
  }

  // this design was initially a lot more simple
  // I had to complicate things in order to make it work in WEBGL
  pattern() {
    push();
    translate(this.x, this.y);
    noStroke();
    fill(255);
    // topmost downward facing isosceles triangles
    beginShape();
    vertex(0, 0);
    vertex(this.width / 2, this.height - this.offset);
    vertex(this.width, 0);
    endShape(CLOSE);
    // left facing scalene triangle
    beginShape();
    vertex(this.width, this.height - this.offset);
    vertex(this.width / 2, this.height);
    vertex(this.width, this.height);
    endShape(CLOSE);
    // right facing scalene triangle
    beginShape();
    vertex(0, this.height - this.offset);
    vertex(this.width / 2, this.height);
    vertex(0, this.height);
    endShape(CLOSE);
    pop();
  }

  display() {
    push();
    translate(width / 2, height / 2);
    rotateX(PI / 2);
    this.pattern();
    pop();
  }
}
