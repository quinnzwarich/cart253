class Curtain {
  constructor(x, z) {
    this.x = x;
    this.z = z;
    this.noiseScale = 0.02;
  }

  drawCurtain() {
    for (let i = 0; i < 100; i++) {
      let noiseValue = noise(this.x * this.noiseScale, i * this.noiseScale);
      push();
      stroke(255 / noiseValue, 0, 0);
      translate(this.x - 50, 0, this.z);
      rotateY(PI / 2);
      line(-noiseValue * 80, 0, i - noiseValue * 80, -noiseValue * 80, height, i - noiseValue * 80);
      pop();
    }
  }

  display() {
    push();
    translate(width / 2, -height / 2);
    rotateY(PI / 2);
    this.drawCurtain();
    pop();
  }
}
