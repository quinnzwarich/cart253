class Sycamore {
  constructor(x, y, z, i) {
    this.trunk1 = createVector(x, y, z);
    this.trunk2 = createVector(random(x - 10, x + 10), y - 200, random(z - 10, z + 10));
    this.trunk3 = createVector(random(x - 10, x + 10), y - 266, random(z - 10, z + 10));
    this.trunk4 = createVector(random(x - 10, x + 10), y - 300, random(z - 10, z + 10));
    this.noiseTotal = 18;
    this.noiseScale = 0.2;
    this.noiseArray = [];
    this.branchPositions = [];
  }

  calculateNoise() {
    for (let i = 0; i < this.noiseTotal; i++) {
      let noiseValue = map(noise(i * this.noiseScale), 0, 1, -1, 1);
      this.noiseArray.push(noiseValue);
    }
  }

  bottomBranch() {
    // draw a branch along the first half of the first segment
    // begin with one longer stem and end with a shorter one

    let branch1 = p5.Vector.sub(this.trunk2, this.trunk1);
        branch1.mult(random(0.25, 0.5));
        this.branchPositions.push(branch1.x);
        this.branchPositions.push(branch1.y);
        this.branchPositions.push(branch1.z);

    let branch2 = createVector(branch1.x + (this.noiseArray[0] * 66),
                               branch1.y + (this.noiseArray[1] * 66),
                               branch1.z + (this.noiseArray[2] * 33));
                               this.branchPositions.push(branch2.x);
                               this.branchPositions.push(branch2.y);
                               this.branchPositions.push(branch2.z);

    let branch3 = createVector(branch2.x + (this.noiseArray[3] * 33),
                               branch2.y + (this.noiseArray[4] * 33),
                               branch2.z + (this.noiseArray[5] * 16.5));
                               this.branchPositions.push(branch3.x);
                               this.branchPositions.push(branch3.y);
                               this.branchPositions.push(branch3.z);

    let branch4 = createVector(branch3.x + (this.noiseArray[6] * 16.5),
                               branch3.y + (this.noiseArray[7] * 16.5),
                               branch3.z + (this.noiseArray[8] * 8.25));
                               this.branchPositions.push(branch3.x);
                               this.branchPositions.push(branch3.y);
                               this.branchPositions.push(branch3.z);
  }

  middleBranch() {
    // draw a branch along the second half of the first segment
    // begin with one shorter stem and end with a longer one

    let branch1 = p5.Vector.sub(this.trunk2, this.trunk1);
        branch1.mult(random(0.5, 1));
        this.branchPositions.push(branch1.x);
        this.branchPositions.push(branch1.y);
        this.branchPositions.push(branch1.z);

    let branch2 = createVector(branch1.x + (this.noiseArray[9] * 33),
                               branch1.y + (this.noiseArray[10] * 33),
                               branch1.z + (this.noiseArray[11] * 16.5));
                               this.branchPositions.push(branch2.x);
                               this.branchPositions.push(branch2.y);
                               this.branchPositions.push(branch2.z);

    let branch3 = createVector(branch2.x + (this.noiseArray[12] * 66),
                               branch2.y + (this.noiseArray[13] * 66),
                               branch2.z + (this.noiseArray[14] * 33));
                               this.branchPositions.push(branch3.x);
                               this.branchPositions.push(branch3.y);
                               this.branchPositions.push(branch3.z);
  }

  topBranch() {
    let branch1 = p5.Vector.sub(this.trunk3, this.trunk2);
        branch1.mult(random(0, 1));
        this.branchPositions.push(branch1.x);
        this.branchPositions.push(branch1.y);
        this.branchPositions.push(branch1.z);

    let branch2 = createVector(branch1.x + (this.noiseArray[15] * 33),
                               branch1.y + (this.noiseArray[16] * 33),
                               branch1.z + (this.noiseArray[17] * 16.5));
                               this.branchPositions.push(branch2.x);
                               this.branchPositions.push(branch2.y);
                               this.branchPositions.push(branch2.z);
  }

  display() {
    this.calculateNoise();
    this.bottomBranch();
    this.middleBranch();
    this.topBranch();
    randomSeed(1);

    // draw the trunk
    push();
    stroke(225);
    strokeWeight(random(1, 2));
    line(this.trunk1.x, this.trunk1.y, this.trunk1.z, this.trunk2.x, this.trunk2.y, this.trunk2.z);
    line(this.trunk2.x, this.trunk2.y, this.trunk2.z, this.trunk3.x, this.trunk3.y, this.trunk3.z);
    line(this.trunk3.x, this.trunk3.y, this.trunk3.z, this.trunk4.x, this.trunk4.y, this.trunk4.z);
    pop();

    // draw the bottom branch
    push();
    stroke(225);
    strokeWeight(random(1, 2));
    translate(this.trunk1);
    line(this.branchPositions[0], this.branchPositions[1], this.branchPositions[2], this.branchPositions[3], this.branchPositions[4], this.branchPositions[5]);
    line(this.branchPositions[3], this.branchPositions[4], this.branchPositions[5], this.branchPositions[6], this.branchPositions[7], this.branchPositions[8]);
    line(this.branchPositions[6], this.branchPositions[7], this.branchPositions[8], this.branchPositions[9], this.branchPositions[10], this.branchPositions[11]);
    pop();

    // draw the middle branch
    push();
    stroke(225);
    strokeWeight(random(1, 2));
    translate(this.trunk1);
    line(this.branchPositions[12], this.branchPositions[13], this.branchPositions[14], this.branchPositions[15], this.branchPositions[16], this.branchPositions[17]);
    line(this.branchPositions[15], this.branchPositions[16], this.branchPositions[17], this.branchPositions[18], this.branchPositions[19], this.branchPositions[20]);
    pop();

    // draw the top branch
    push();
    stroke(225);
    strokeWeight(random(1, 2));
    translate(this.trunk2);
    line(this.branchPositions[21], this.branchPositions[22], this.branchPositions[23], this.branchPositions[24], this.branchPositions[25], this.branchPositions[26]);
    pop();
  }
}
