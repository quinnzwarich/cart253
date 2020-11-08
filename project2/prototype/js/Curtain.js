class Curtain {
  constructor(x, z) {
    this.x = x;
    this.z = z;
    this.noiseScale = 0.2;
    this.polygons = undefined;
    this.positionsI = [];
    this.positionsJ = [];

  }

  drawCurtain() {
    for (let i = 0; i < this.polygons / 8; i++) {
      let noiseValue = noise(this.x * this.noiseScale, i * this.noiseScale);
      // let position1 = [-noiseValue * 80, 0, (i * 8) - noiseValue * 80];
      // let position2 = [-noiseValue * 80, height, (i * 8) - noiseValue * 80];
      // this.positionsI.push(position1);
      // this.positionsJ.push(position2);

      push();
      noStroke();
      // fix fill so that it inverts depending on rotation
      fill(noiseValue * 200, 0, 0);
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

  display() {
    // define in child classes
  }
}
