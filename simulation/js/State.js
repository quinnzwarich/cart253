class State {
  constructor() {

  }

  draw() {
    background(255);
    camera(0, 0, (height) / tan(PI*30.0 / 180.0), 0, 0, 0, 0, 1, 0);
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
    translate(-width + 275, -height/2);
    for (let i = 0; i < flowers.length; i++) {
      let flower = flowers[i];
      flower.drawFlower();
      flower.levitate();
      if (!flower.active) {
        flowers.splice(i, 1);
      }
    }
  }

  display() {
    // push();
    // rotateX(PI / 3);
    // this.drawGrass();
    // pop();
    push();
    rotateX(PI / 2.75);
    this.drawFlowers();
    pop();
  }

  keyPressed() {
    let flower = random(flowers);
    flower.movement = true;
    console.log(flowers.length);
  }
}
