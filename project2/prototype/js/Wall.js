class Wall extends Curtain {
  constructor(x, z, rotation) {
    super(x, z, rotation);
    this.polygons = (columns * 100);
  }

  returnNoiseValue(i) {
    return noiseValue = noise(this.x * this.noiseScale, i * this.noiseScale);
  }

  drawCurtain() {
    for (let i = 0; i < this.polygons / 8; i++) {
    let noiseValue = noise(this.x * this.noiseScale, i * this.noiseScale);

      this.red = noiseValue * 200;
      this.invertRed = map(this.red, 0, 200, 200, 0);

      push();
      noStroke();
      fill(this.red, 0, 0);
      translate(this.x + 30, 0, this.z);
      rotateY(PI / 2);

      let nextValue = noise(this.x * this.noiseScale, (i + 1) * this.noiseScale);

      beginShape();
      vertex(-noiseValue * 80, 0, (i * 8) - noiseValue * 60);
      vertex(-nextValue * 80, 0, ((i + 1) * 8) - nextValue * 60);
      vertex(-nextValue * 80, height, ((i + 1) * 8) - nextValue * 60);
      vertex(-noiseValue * 80, height, (i * 8) - noiseValue * 60);
      endShape(CLOSE)
      pop();
    }
  }
}
