class Terrain {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.radius1 = 130;
    this.radius2 = 160;
    this.radius3 = 600;
    this.numPoints = 9;
    this.coordinates1 = [];
    this.coordinates2 = [];
    this.coordinates3 = [];
    this.once = false;
  }

  portal() {
    let angle = (PI * 2) / this.numPoints;
    for (let i = 0; i < (PI * 2); i += angle) {
      let sx1 = this.x + cos(i) * this.radius1;
      let sy1 = this.y + sin(i) * this.radius1;
      let sx2 = this.x + cos(i) * this.radius2;
      let sy2 = this.y + sin(i) * this.radius2;
      let sx3 = this.x + cos(i) * this.radius3;
      let sy3 = this.y + sin(i) * this.radius3;
      this.coordinates1.push({x: sx1, y: sy1});
      this.coordinates2.push({x: sx2, y: sy2});
      this.coordinates3.push({x: sx3, y: sy3});
    }
    for (let i = 0; i < this.coordinates1.length; i++) {
      if ( i < this.coordinates1.length - 1) {
        push();
        noStroke();
        fill(127);
        beginShape();
        vertex(this.coordinates1[i].x, this.coordinates1[i].y, 0);
        vertex(this.coordinates1[i + 1].x, this.coordinates1[i + 1].y, 0);
        vertex(this.coordinates2[i + 1].x, this.coordinates2[i + 1].y, 30);
        vertex(this.coordinates2[i].x, this.coordinates2[i].y, 30);
        endShape(CLOSE);
        pop();

        push();
        noStroke();
        fill(0, 64, 0);
        beginShape();
        vertex(this.coordinates3[i].x, this.coordinates3[i].y, 30);
        vertex(this.coordinates3[i + 1].x, this.coordinates3[i + 1].y, 30);
        vertex(this.coordinates2[i + 1].x, this.coordinates2[i + 1].y, 30);
        vertex(this.coordinates2[i].x, this.coordinates2[i].y, 30);
        endShape(CLOSE);
        pop();
      }
      else {
        push();
        noStroke();
        fill(127);
        beginShape();
        vertex(this.coordinates1[i].x, this.coordinates1[i].y, 0);
        vertex(this.coordinates1[0].x, this.coordinates1[0].y, 0);
        vertex(this.coordinates2[0].x, this.coordinates2[0].y, 30);
        vertex(this.coordinates2[i].x, this.coordinates2[i].y, 30);
        endShape(CLOSE);
        pop();

        push();
        noStroke();
        fill(0, 64, 0);
        beginShape();
        vertex(this.coordinates3[i].x, this.coordinates3[i].y, 30);
        vertex(this.coordinates3[0].x, this.coordinates3[0].y, 30);
        vertex(this.coordinates2[0].x, this.coordinates2[0].y, 30);
        vertex(this.coordinates2[i].x, this.coordinates2[i].y, 30);
        endShape(CLOSE);
        pop();
      }
    }
  }

  display() {
    push();
    translate(width / 2, height / 2);
    rotateX(PI/2);
    translate(this.x, this.y, this.z);
    this.portal();
    pop();
  }
}
