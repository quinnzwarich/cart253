class Wall extends Curtain {
  constructor(x, z, rotation) {
    super(x, z, rotation);
    this.polygons = (columns * 100);
  }

  drawCurtain() {
    for (let i = 0; i < this.polygons / 8; i++) {
      let noiseValue = noise(this.x * this.noiseScale, i * this.noiseScale);

      // let position1 = [-noiseValue * 80, 0, (i * 8) - noiseValue * 80];
      // let position2 = [-noiseValue * 80, height, (i * 8) - noiseValue * 80];
      // this.positionsI.push(position1);
      // this.positionsJ.push(position2);

      this.red = noiseValue * 200;
      this.invertRed = map(this.red, 0, 200, 200, 0);

      push();
      noStroke();
      fill(this.red, 0, 0);
      translate(this.x + 30, 0, this.z);
      rotateY(PI / 2);

      beginShape();
      vertex(-noiseValue * 80, 0, (i * 8) - noiseValue * 80);
      vertex(-noiseValue * 80, 0, ((i + 1) * 8) - noiseValue * 80);
      vertex(-noiseValue * 80, height, ((i + 1) * 8) - noiseValue * 80);
      vertex(-noiseValue * 80, height, (i * 8) - noiseValue * 80);
      endShape(CLOSE)
      pop();
    }
  }
}
