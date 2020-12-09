class Terrain {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.radius1 = 130;
    this.radius2 = 160;
    this.radius3 = 2400;
    this.numPoints = 9;
    this.coordinates1 = [
      { x: 376.25, y: 675 },
      { x: 345.83, y: 758.56 },
      { x: 268.82, y: 803.02 },
      { x: 181.25, y: 787.58 },
      { x: 124.08, y: 719.46 },
      { x: 124.08, y: 630.53 },
      { x: 181.24, y: 562.41 },
      { x: 268.82, y: 546.97 },
      { x: 345.83, y: 591.43 },
    ];
    this.coordinates2 = [
      { x: 406.25, y: 675 },
      { x: 368.81, y: 777.84 },
      { x: 274.03, y: 832.56 },
      { x: 166.25, y: 813.56 },
      { x: 95.89, y: 729.72 },
      { x: 95.89, y: 620.27 },
      { x: 166.24, y: 536.43 },
      { x: 274.03, y: 517.43 },
      { x: 368.81, y: 572.15 },
    ];
  }

  // the function I originally used to generate the coordinates was too computationally intensive
  // so I decided to just record them manually
  // the code used to do so is here, heavily based off a p5.js example
  // https://p5js.org/examples/form-regular-polygon.html
  //
  // let angle = (PI * 2) / this.numPoints;
  // for (let i = 0; i < (PI * 2); i += angle) {
  //   let sx1 = this.x + cos(i) * this.radius1;
  //   let sy1 = this.y + sin(i) * this.radius1;
  //   let sx2 = this.x + cos(i) * this.radius2;
  //   let sy2 = this.y + sin(i) * this.radius2;
  //   let sx3 = this.x + cos(i) * this.radius3;
  //   let sy3 = this.y + sin(i) * this.radius3;
  //   this.coordinates1.push({x: sx1, y: sy1});
  //   this.coordinates2.push({x: sx2, y: sy2});
  //   this.coordinates.push({x: sx3, y: sy3});
  //   console.log(this.coordinates);
  // }

  // draws the portal and grass based on various extensions of a nonagon
  // conditions on second thought are not super necessary,
  // but were used so that the last coordinate could connect to first
  portalAndGrass() {
    beginShape();
    for (let i = 0; i < this.coordinates1.length; i++) {
      if (i < this.coordinates1.length - 1) {
        // portal rim
        push();
        noStroke();
        fill(random(119, 135));
        beginShape();
        vertex(this.coordinates1[i].x, this.coordinates1[i].y, 0);
        vertex(this.coordinates1[i + 1].x, this.coordinates1[i + 1].y, 0);
        vertex(this.coordinates2[i + 1].x, this.coordinates2[i + 1].y, 30);
        vertex(this.coordinates2[i].x, this.coordinates2[i].y, 30);
        endShape(CLOSE);
        pop();

        // grass
        push();
        noStroke();
        fill(random(0, 56), random(48, 64), random(0, 16));
        beginShape();
        vertex(terrainCoordinates[i].x, terrainCoordinates[i].y, 30);
        vertex(terrainCoordinates[i + 1].x, terrainCoordinates[i + 1].y, 30);
        vertex(this.coordinates2[i + 1].x, this.coordinates2[i + 1].y, 30);
        vertex(this.coordinates2[i].x, this.coordinates2[i].y, 30);
        endShape(CLOSE);
        pop();
      } else {
        // portal rim
        push();
        noStroke();
        fill(random(119, 135));
        beginShape();
        vertex(this.coordinates1[i].x, this.coordinates1[i].y, 0);
        vertex(this.coordinates1[0].x, this.coordinates1[0].y, 0);
        vertex(this.coordinates2[0].x, this.coordinates2[0].y, 30);
        vertex(this.coordinates2[i].x, this.coordinates2[i].y, 30);
        endShape(CLOSE);
        pop();

        // grass
        push();
        noStroke();
        fill(random(0, 56), random(48, 64), random(0, 16));
        beginShape();
        vertex(terrainCoordinates[i].x, terrainCoordinates[i].y, 30);
        vertex(terrainCoordinates[0].x, terrainCoordinates[0].y, 30);
        vertex(this.coordinates2[0].x, this.coordinates2[0].y, 30);
        vertex(this.coordinates2[i].x, this.coordinates2[i].y, 30);
        endShape(CLOSE);
        pop();
      }
    }
  }

  // I decided to give this part its own function because I had trouble adding it back in
  black() {
    push();
    beginShape();
    for (let i = 0; i < this.coordinates1.length; i++) {
      // black well of the portal
      noStroke();
      fill(0);
      vertex(this.coordinates1[i].x, this.coordinates1[i].y, 0);
    }
    endShape(CLOSE);
    pop();
  }

  display() {
    push();
    translate(width / 2, height / 2);
    rotateX(PI / 2);
    translate(this.x, this.y, this.z);
    this.portalAndGrass();
    this.black();
    pop();
  }
}
