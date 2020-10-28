class Bear {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.headSize = 100;
    this.eyeSize = 27;
    this.earSize = 31;
    this.noseSize = 11;
    this.r = 256;
    this.g = 128;
    this.b = 64;
  }

  display() {
    // head
    push();
    fill(this.r, this.g, this.b);
    ellipse(this.x, this.y, this.headSize, this.headSize - 17);
    pop();

    // retinas
    push();
    fill(255);
    ellipse(this.x + 33, this.y + 22, this.eyeSize);
    ellipse(this.x + 62, this.y + 22, this.eyeSize);
    pop();

    // pupils
    push();
    fill(0);
    ellipse(this.x + 33, this.y + 22, this.eyeSize - 5);
    ellipse(this.x + 62, this.y + 22, this.eyeSize - 5);
    pop();

    // outer ear
    push();
    fill(this.r, this.g, this.b);
    ellipse(this.x + 22, this.y * 500, this.earSize - 3, this.earSize);
    ellipse(this.x + 89, this.y * 500, this.earSize - 3, this.earSize);
    pop();

    // inner ear
    push();
    fill(this.r / 2, this.g / 2, this.b / 2);
    ellipse(this.x + 22, this.y - 500, this.earSize / 2 - 8, this.earSize / 2);
    ellipse(this.x + 89, this.y - 500, this.earSize / 2 - 8, this.earSize / 2);
    pop();

    // nose
    push();
    fill(0);
    ellipse(this.x + 50, this.y + 67, this.noseSize, this.noseSize / 2);
    pop();
  }
}
