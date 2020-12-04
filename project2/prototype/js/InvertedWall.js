class InvertedWall extends Curtain {
  constructor(x, z, rotation) {
    super(x, z, rotation);
    this.polygons = (columns * 100);
    this.invertedReds = [];
  }

  drawCurtain() {
    for (let i = 0; i < this.polygons / 8; i++) {
      let noiseValue = noise(this.x * this.noiseScale, i * this.noiseScale);
      this.noiseArray.push(noiseValue);

      let invertedRed = map(this.noiseArray[i] * 200, 0, 200, 200, 0);
      this.invertedReds.push(invertedRed);

      push();
      noStroke();
      fill(this.invertedReds[i], 0, 0);
      translate(this.x + 30, 0, this.z);
      rotateY(PI / 2);

      beginShape();
      vertex(-this.noiseArray[i] * 80, 0, (i * 8) - this.noiseArray[i] * 80);
      vertex(-this.noiseArray[i + 1] * 80, 0, ((i + 1) * 8) - this.noiseArray[i + 1] * 80);
      vertex(-this.noiseArray[i + 1] * 80, height * 2, ((i + 1) * 8) - this.noiseArray[i + 1] * 80);
      vertex(-this.noiseArray[i] * 80, height * 2, (i * 8) - this.noiseArray[i] * 80);
      endShape(CLOSE)
      pop();
    }
  }
}
