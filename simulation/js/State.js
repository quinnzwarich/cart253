class State {
  constructor() {

  }

  draw() {
    background(0, 127, 255);
    this.display();
    this.text();
  }

  text() {

  }

  drawGrass() {
    translate(-width / 2, -height / 2);
    push();
    translate(0, 0, 150);
    noStroke();
    fill(186, 230, 179);
    rect(-width / 4, height / 6, width * 2, height);
    pop();
  }

  drawFlowers() {
    translate(-width / 2, -height / 2);
    for (let x = 0; x < columns; x++) {
      for (let y = 0; y < rows - 1; y++) {
        // let force = createVector(0, -1, 0);
        let flower = flowers[x][y];
        // flower.gravity(force);
        flower.levitate();
        flower.drawFlower();
      }
    }
  }

  display() {
    push();
    rotateX(PI / 3);
    this.drawGrass();
    pop();
    push();
    rotateX(PI / 3);
    this.drawFlowers();
    pop();
  }

  keyPressed() {

  }
}
