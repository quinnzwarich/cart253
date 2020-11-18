class Corridor extends Curtain {
  constructor(x, z, rotation) {
    super(x, z, rotation);
    this.polygons = (columns * 83);
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
      vertex(-noiseValue * 80, 0, (i * 8) - noiseValue * 80);
      vertex(-nextValue * 80, 0, ((i + 1) * 8) - nextValue * 80);
      vertex(-nextValue * 80, height * 2, ((i + 1) * 8) - nextValue * 80);
      vertex(-noiseValue * 80, height * 2, (i * 8) - noiseValue * 80);
      endShape(CLOSE)
      pop();
    }
  }
}
