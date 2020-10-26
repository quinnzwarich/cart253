
class Paddle {
  constructor(x, y, angle) {
    this.width = width/6;
    this.height = height/42;
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.speed = 1;
    this.angle = angle;
  }

  move() {
    if (keyIsDown(LEFT_ARROW)) {
      this.vx = -(this.speed++);
    }
    else if (keyISDown(RIGHT_ARROW)) {
      this.vx = this.speed++;
    }
    else {
      this.vx = 0;
    }
  }

  display() {
    push();
    fill(255);
    noStroke();
    rectMode(CENTER);
    translate(this.width + this.x, (this.height * 6) + this.y);
    rotate(this.angle + this.vx);
    rect(0, 0, this.width, this.height);
    pop();
  }
}
