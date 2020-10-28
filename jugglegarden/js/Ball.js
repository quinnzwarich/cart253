class Bear {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.ax = 0;
    this.ay = 0;
    this.addBear = false;
    this.maxSpeed = 10;
    this.active = true;
    this.headSize = 100;
    this.eyeSize = 27;
    this.earSize = 31;
    this.noseSize = 11;
    this.r = 256;
    this.g = 128;
    this.b = 64;
  }

  gravity(force) {
    this.ay = this.ay + force;
  }

  move() {
    this.vx = this.vx + this.ax;
    this.vy = this.vy + this.ay;

    this.vx = constrain(this.vx, -this.maxSpeed, this.maxSpeed);
    this.vy = constrain(this.vy, -this.maxSpeed, this.maxSpeed);

    this.x = this.x + this.vx;
    this.y = this.y + this.vy;

    if (this.y - this.headSize/2 > height) {
      this.active = false;
    }
  }

  bounce(cloud) {
      if (
        this.x > cloud.x - cloud.width / 2 &&
        this.x < cloud.x + cloud.width / 2 &&
        this.y + (this.headSize - 17) / 2 > cloud.y - cloud.height / 2 &&
        this.y - (this.headSize - 17) / 2 < cloud.y + cloud.height / 2
      ) {
        // bounce off paddle
        let dx = this.x - cloud.x;
        this.vx = this.vx + map(dx, -cloud.width/2, cloud.width/2, -2, 2);

        this.vy = -this.vy;
        this.ay = 0;

      }
      else if (this.x >= width) {
        // appear from the left
        this.x = 0;
      }
      else if (this.x <= 0) {
        // appear from the right
        this.x = width;
      }
    }

  display() {
    // outer ear
    push();
    fill(this.r, this.g, this.b);
    ellipse(this.x + 24, this.y - 32, this.earSize - 3, this.earSize);
    ellipse(this.x - 24, this.y - 32, this.earSize - 3, this.earSize);
    pop();

    // inner ear
    push();
    fill(this.r / 2, this.g / 2, this.b / 2);
    ellipse(this.x + 24, this.y - 34, this.earSize / 2 - 5, this.earSize / 2);
    ellipse(this.x - 24, this.y - 34, this.earSize / 2 - 5, this.earSize / 2);
    pop();

    // head
    push();
    fill(this.r, this.g, this.b);
    ellipse(this.x, this.y, this.headSize, this.headSize - 17);
    pop();

    // retinas
    push();
    fill(255);
    ellipse(this.x + 21, this.y - 16, this.eyeSize);
    ellipse(this.x - 21, this.y - 16, this.eyeSize);
    pop();

    // pupils
    push();
    fill(0);
    ellipse(this.x + 21, this.y - 16, this.eyeSize - 10);
    ellipse(this.x - 21, this.y - 16, this.eyeSize - 10);
    pop();

    // nose
    push();
    fill(this.r / 2, this.g / 2, this.b / 2);
    ellipse(this.x, this.y, this.noseSize, this.noseSize / 2);
    pop();
  }
}
