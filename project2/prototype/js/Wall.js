class Wall extends Curtain {
  constructor(x, z, rotation, i) {
    super(x, z, rotation, i);
  }

  returnNoiseValues() {
    return noiseValue = noise(this.x * this.noiseScale, this.i * this.noiseScale);
  }

  drawCurtain() {
    let noiseValue = noise(this.x * this.noiseScale, this.i * this.noiseScale);
    this.noiseArray.push(noiseValue);

    let nextValue = noise(this.x * this.noiseScale, (this.i + 1) * this.noiseScale);
    this.nextArray.push(nextValue);

    push();
    noStroke();
    fill(this.noiseArray[this.i] * 200, 0, 0);
    translate(this.x + 30, 0, this.z);
    rotateY(PI / 2);

    beginShape();
    vertex(-this.noiseArray[this.i] * 80, 0, (this.i * 8) - this.noiseArray[this.i] * 80);
    vertex(-this.nextArray[this.i] * 80, 0, ((this.i + 1) * 8) - this.nextArray[this.i] * 80);
    vertex(-this.nextArray[this.i] * 80, height * 2, ((this.i + 1) * 8) - this.nextArray[this.i] * 80);
    vertex(-this.noiseArray[this.i] * 80, height * 2, (this.i * 8) - this.noiseArray[this.i] * 80);
    endShape(CLOSE)
    pop();
  }
}
