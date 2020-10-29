class Chevron {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 100;
    this.height = 50;
    this.offset = 25;
  }

  pattern() {
    push();
    noStroke();
    fill(255);
    beginShape();
    vertex(0, 0);
    vertex(this.width / 2, this.height - this.offset);
    vertex(this.width, 0);
    vertex(this.width, this.offset);
    vertex(this.width / 2, this.height);
    vertex(0, this.offset);
    vertex(0, 0);
    endShape();
    pop();
  }

  floorColour() {
    push();
    noStroke();
    fill(0);
    rect(0, 0, this.width, this.height);
    pop();
  }

  display() {
    push();
    translate(this.x, this.y);
    this.floorColour();
    this.pattern();
    pop();
  }

}
