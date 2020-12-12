class  Flower {
  constructor(x, y, z, r, g, b, v, a) {
    this.petals = {
      x1: 0,
      y1: 15,
      x2: 0,
      y2: 0,
      x3: 5,
      y3: 10,
      total: 8,
    };
    this.stem = {
      x1: 0,
      y1: 0,
      x2: 0,
      y2: 60,
    };
    this.arguments = {
      position: createVector(x, y, z),
      velocity: createVector(0, v, 0),
      red: r,
      green: g,
      blue: b,
      angle: a,
    };
    this.acceleration = createVector();
    this.active = true;
    this.movement = false;
  }

  drawStem() {
    line(this.stem.x1, this.stem.y1, this.stem.x2, this.stem.y2);
  }

  drawPetals() {
    for (let i = 0; i < this.petals.total; i++) {
      rotateY(this.arguments.angle);
      rotate(PI / 4);
      triangle(this.petals.x1, this.petals.y1, this.petals.x2, this.petals.y2, this.petals.x3, this.petals.y3);
    }
  }

  drawFlower() {
    push();
    translate(250, 650, 250);
    translate(this.arguments.x, this.arguments.y, this.arguments.z);
    rotateX(-PI / 2);
    strokeWeight(0.5);
    stroke(211, 255, 204);
    drawStem();
    fill(this.arguments.red, this.arguments.green, this.arguments.blue);
    stroke(this.arguments.red, this.arguments.green, this.arguments.blue);
    rotateX(PI);
    rotateY(2 * PI);
    drawPetals();
    pop();
  }

  gravity(force) {
    this.acceleration = force;
  }

  levitate() {
    if (movement) {
      this.velocity.add(this.acceleration);
      this.position.add(this.velocity);
    }
  }
}
