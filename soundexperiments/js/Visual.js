class Visual {
  constructor() {
    this.circleSize = height;
  }

  drawOmni() {
    push();
    noStroke();
    fill(220);
    ellipse(this.circleSize/2, -this.circleSize/2 + height, this.circleSize);
    ellipse(-this.circleSize/6 + width, this.circleSize/6, this.circleSize/3)
    // beginShape();
    // vertex(this.circleSize/2, this.circleSize/3);
    // vertex(-this.circleSize/6 + width, 0);
    // vertex(11 * width/12 + 12, this.circleSize/3)
    // vertex(this.circleSize/2 + 12, height);
    // endShape(CLOSE);
    pop();
  }
}
