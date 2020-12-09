class Wall extends Curtain {
  constructor(x, z, rotation, i) {
    super(x, z, rotation, i);
  }

  // this doesn't really do anything at this point but I am scared to take it out...
  returnNoiseValues() {
    return (noiseValue = noise(
      this.x * this.noiseScale,
      this.i * this.noiseScale
    ));
  }

  // generates 2D noise values and stores them arrays
  // one array handles the first point, the other handles the second point
  // this is important as the last point of one shape will be the first point of the next
  drawCurtain() {
    let noiseValue = noise(this.x * this.noiseScale, this.i * this.noiseScale);
    this.noiseArray.push(noiseValue);

    let nextValue = noise(
      this.x * this.noiseScale,
      (this.i + 1) * this.noiseScale
    );
    this.nextArray.push(nextValue);

    push();
    noStroke();
    fill(this.noiseArray[this.i] * 200, 0, 0, transparency);
    translate(this.x + 30, 0, this.z);
    rotateY(PI / 2);

    beginShape();
    vertex(
      -this.noiseArray[this.i] * 80,
      0,
      this.i * 8 - this.noiseArray[this.i] * 80
    );
    vertex(
      -this.nextArray[this.i] * 80,
      0,
      (this.i + 1) * 8 - this.nextArray[this.i] * 80
    );
    vertex(
      -this.nextArray[this.i] * 80,
      height * 2,
      (this.i + 1) * 8 - this.nextArray[this.i] * 80
    );
    vertex(
      -this.noiseArray[this.i] * 80,
      height * 2,
      this.i * 8 - this.noiseArray[this.i] * 80
    );
    endShape(CLOSE);
    pop();
  }
}
