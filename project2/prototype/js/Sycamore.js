class Sycamore {
  constructor(x, y, z,
              x1, y1, z1,
              x2, y2, z2,
              x3, y3, z3,
              x4, y4, z4,
              x5, y5, z5,
              x6, y6, z6,
              x7, y7, z7,
              x8, y8, z8, i) {
    this.origin = createVector(x, y, z);
    this.trunk1 = createVector(x1, y1, z1);
    this.trunk2 = createVector(x2, y2, z2);
    this.trunk3 = createVector(x3, y3, z3);
    this.branch1 = createVector(x4, y4, z4);
    this.branch2 = createVector(x5, y5, z5);
    this.branch3 = createVector(x6, y6, z6);
    this.branch4 = createVector(x7, y7, z7);
    this.branch5 = createVector(x8, y8, z8);
    this.i = i;
  }

  trunk() {
    push();
    stroke(225);
    line(this.origin.x, this.origin.y, this.origin.z, this.trunk1.x, this.trunk1.y, this.trunk1.z);
    line(this.trunk1.x, this.trunk1.y, this.trunk1.z, this.trunk2.x, this.trunk2.y, this.trunk2.z);
    line(this.trunk2.x, this.trunk2.y, this.trunk2.z, this.trunk3.x, this.trunk3.y, this.trunk3.z);
    pop();
  }

  bottomBranches() {
    randomSeed(this.i);
    let branch1 = p5.Vector.sub(this.trunk1, this.origin);
        branch1.mult(random(0, 1));
    let branch2 = p5.Vector.sub(this.trunk1, this.origin);
        branch2.mult(random(0, 1));

    push();
    stroke(255);
    translate(this.origin);
    line(branch1.x, branch1.y, branch1.z, this.branch1.x, this.branch1.y, this.branch1.z);
    line(branch2.x, branch2.y, branch2.z, this.branch2.x, this.branch2.y, this.branch2.z);
    pop();
  }

  middleBranches() {
    randomSeed(this.i);
    let branch3 = p5.Vector.sub(this.trunk2, this.trunk1);
        branch3.mult(random(0, 1));
    let branch4 = p5.Vector.sub(this.trunk2, this.trunk1);
        branch4.mult(random(0, 1));

    push();
    stroke(255);
    translate(this.trunk1);
    line(branch3.x, branch3.y, branch3.z, this.branch3.x, this.branch3.y, this.branch3.z);
    line(branch4.x, branch4.y, branch4.z, this.branch4.x, this.branch4.y, this.branch4.z);
    pop();
  }

  topBranch() {
    randomSeed(this.i);
    let branch5 = p5.Vector.sub(this.trunk3, this.trunk2);
        branch5.mult(random(0, 1));

    push();
    stroke(255);
    translate(this.trunk2);
    line(branch5.x, branch5.y, branch5.z, this.branch5.x, this.branch5.y, this.branch5.z);
    pop();
  }

  display() {
    this.trunk();
    this.bottomBranches();
    this.middleBranches();
    this.topBranch();
  }
}
