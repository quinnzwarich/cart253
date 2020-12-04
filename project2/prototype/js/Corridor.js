class Corridor extends Curtain {
  constructor(x, z, rotation, i) {
    super(x, z, rotation);
    this.polygons = (columns * 83);
    this.i = i;
  }

  drawCurtain() {
    let noiseValue = noise(this.x * this.noiseScale, this.i * this.noiseScale);
    this.noiseArray.push(noiseValue);

    push();
    noStroke();
    fill(this.noiseArray[this.i] * 200, 0, 0);
    translate(this.x + 30, 0, this.z);
    rotateY(PI / 2);

    beginShape();
    vertex(-this.noiseArray[this.i] * 80, 0, (this.i * 8) - this.noiseArray[this.i] * 80);
    vertex(-this.noiseArray[this.i + 1] * 80, 0, ((this.i + 1) * 8) - this.noiseArray[this.i + 1] * 80);
    vertex(-this.noiseArray[this.i + 1] * 80, height * 2, ((this.i + 1) * 8) - this.noiseArray[this.i + 1] * 80);
    vertex(-this.noiseArray[this.i] * 80, height * 2, (this.i * 8) - this.noiseArray[this.i] * 80);
    endShape(CLOSE)
    pop();
  }
}
