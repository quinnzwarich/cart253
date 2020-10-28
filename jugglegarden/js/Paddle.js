class Cloud {
  constructor(x, y) {
    this.width = 300;
    this.height = 75;
    this.cloudTotal = 9;
    this.cloudSize = 0;
    this.x = x;
    this.y = y;
  }

  // generates clouds by placing randomly sized ellipses within the area of a rectangle at random coordinates
  // hit box can then just become the area in which they're generated
  display(seed) {
    randomSeed(seed);
    for (let i = 0; i < this.cloudTotal; i++) {
      let rx = random(this.x - this.width / 2, this.x + this.width / 2);
      let ry = random(this.y - this.height / 2, this.y + this.height / 2);
      this.cloudSize = random(75, 125);
      push();
      noStroke();
      fill(255);
      ellipse(rx, ry, this.cloudSize);
      pop();
    }
  }
}
