class State {
  constructor() {
    this.gravity = createVector(0, -1, 0);
  }

  draw() {
    background(255);
    this.display();
    this.text();
  }

  text() {

  }

  drawGrass() {
    translate(-width / 4, -height / 4);
    push();
    translate(0, 0, 150);
    noStroke();
    fill(186, 230, 179);
    rect(-width / 4, height / 6, width, height);
    pop();
  }

  drawFlowers() {
    translate(-width/2.55, -height/3);
    for (let i = 0; i < flowers.length; i++) {
      let flower = flowers[i];
      flower.gravity(this.gravity);
      flower.levitate();
      flower.drawFlower();
    }
  }

  display() {
    push();
    rotateX(PI / 3);
    // this.drawGrass();
    pop();
    push();
    rotateX(PI / 3);
    this.drawFlowers();
    pop();
  }

  keyPressed() {

  }
}
