
class Paddle {
  constructor(x, y, w, h, angle) {
    this.width = w;
    this.height = h;
    this.x = x;
    this.y = y;
    this.rotate = 0;
    this.speed = 0.05;
    this.angle = angle;
  }

  move() {
    if (keyIsDown(LEFT_ARROW)) {
      this.rotate = this.rotate + this.speed;
    }
    else if (keyIsDown(RIGHT_ARROW)) {
      this.rotate = this.rotate - this.speed;
    }
  }

  display() {
    push();
    fill(255);
    noStroke();
    rectMode(CENTER);
    translate((this.width/2) + this.x, (this.height * 6) + this.y);
    //rotate(this.angle + this.rotate);
    rect(0, 0, this.width, this.height);
    pop();
  }
}
