class Candy {
  constructor(x, y, z, vx, vy, vz, id, others, r, g, b) {
    this.modelOffset = -75;
    this.position = createVector(x, y, z);
    this.velocity = createVector(vx, vy, vz);
    this.acceleration = createVector();
    this.w = 115;
    this.h = 30;
    this.d = 60;
    this.r = r;
    this.g = g;
    this.b = b;
    this.id = id;
    this.others = others;
    this.touching = [];
  }

  gravity(force) {
    this.acceleration = force;
  }

  move() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
  }

  lineLine(x1, y1, x2, y2, x3, y3, x4, y4) {
    let uA = ((x4-x3)*(y1-y3) - (y4-y3)*(x1-x3)) / ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1));
    let uB = ((x2-x1)*(y1-y3) - (y2-y1)*(x1-x3)) / ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1));

    if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {
      return true;
    }
    return false;
  }

  lineRect(x1, y1, x2, y2, rx, ry, rw, rh) {
    let left =   this.lineLine(x1,y1,x2,y2, rx,ry,rx, ry+rh);
    let right =  this.lineLine(x1,y1,x2,y2, rx+rw,ry, rx+rw,ry+rh);
    let top =    this.lineLine(x1,y1,x2,y2, rx,ry, rx+rw,ry);
    let bottom = this.lineLine(x1,y1,x2,y2, rx,ry+rh, rx+rw,ry+rh);

    if (left || right || top || bottom) {
      return true;
    }
    return false;
  }

  checkOverlapLeftWall() {
    let hit = this.lineRect(-width/tan(PI*30.0 / 180.0), width/2, 0, -width/tan(PI*30.0 / 180.0),
                            this.position.x, this.position.z, this.w, this.d);
    if (hit) {
      this.velocity.x = -(this.velocity.x * 0.5);
      this.velocity.z = -(this.velocity.z * 0.5);
      return true;
    }
    return false;
  }

  checkOverlapRightWall() {
    let hit = this.lineRect(width/tan(PI*30.0 / 180.0), width/2, 0, -width/tan(PI*30.0 / 180.0),
                            this.position.x, this.position.z, this.w, this.d);
    if (hit) {
      this.velocity.x = -(this.velocity.x * 0.5);
      this.velocity.z = -(this.velocity.z * 0.5);
      return true
    }
  }

  checkOverlapFloor() {
    if (this.position.y + this.h/2 >= height/2) {
      if (!this.checkOverlapLeftWall() || this.checkOverlapRightWall()) {
        this.position.y = height/2 - this.h/2;
        this.velocity.x = this.velocity.x * 0.25;
        this.velocity.y = -(this.velocity.y * 0.5);
        this.velocity.z = this.velocity.z * 0.25;
        return true;
      }
      else if (this.checkOverlapLeftWall()) {
        console.log(`bump`);
        this.position.y = height/2 - this.h/2;
        this.velocity.x = this.velocity.x + 1;
        this.velocity.y = -(this.velocity.y * 0.5);
        this.velocity.z = this.velocity.z + 1;
        return true;
      }
      else if (this.checkOverlapRightWall()) {
        console.log(`bump`);
        this.position.y = height/2 - this.h/2;
        this.velocity.x = this.velocity.x - 1;
        this.velocity.y = -(this.velocity.y * 0.5);
        this.velocity.z = this.velocity.z + 1;
        return true;
      }
    }
    return false;
  }

  checkOverlapCandy() {
    for (let i = this.id; i < numCandies; i++) {
      if (this.position.x + this.w/2 > this.others[i].position.x - this.others[i].w/2 &&
          this.position.x - this.w/2 < this.others[i].position.x + this.others[i].w/2 &&
          this.position.y + this.h/2 > this.others[i].position.y - this.others[i].h/2 &&
          this.position.y - this.h/2 < this.others[i].position.y + this.others[i].h/2 &&
          this.position.z + this.d/2 > this.others[i].position.z - this.others[i].d/2 &&
          this.position.z - this.d/2 < this.others[i].position.z + this.others[i].d/2) {

          this.position.y = this.others[i].position.y - this.h/2;
          this.velocity.y = -(this.velocity.y * 0.5);

          // let dx = this.position.x - this.others[i].position.x;
          // this.velocity.x = this.velocity.x + map(dx, -this.w/2, this.w/2, -0.5, 0.5);
          // let dz = this.position.z - this.others[i].position.z;
          // this.velocity.z = this.velocity.z + map(dz, -this.d/2, this.d/2, -0.5, 0.5);
      }
    }
  }

  display() {
    push();
    noStroke();
    fill(this.r, this.g, this.b);
    translate(0, this.modelOffset, 0);
    translate(this.position);
    model(candyModel);
    pop();
  }

}
