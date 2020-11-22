class Candy {
  constructor(x, y, z, vx, vy, vz, id, others) {
    this.modelOffset = -75;
    this.position = createVector(x, y, z);
    this.velocity = createVector(vx, vy, vz);
    this.acceleration = createVector();
    this.w = 115;
    this.h = 30;
    this.d = 60;
    this.id = id;
    this.others = others;
  }

  gravity(force) {
    this.acceleration = force;
  }

  move() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
  }

  triangle() {
    let area = abs( (width/tan(PI*30.0 / 180.0) - (-width/tan(PI*30.0 / 180.0))) *
                    (-width/tan(PI*30.0 / 180.0)) - (width/2) );
    let area1
  }

  checkOverlapFloor() {
    if (this.position.y + this.h/2 >= height/2 &&
        this.position.x + this.w/2 > ) {
      this.position.y = height/2 - this.h/2;
      this.velocity.x = this.velocity.x * 0.25;
      this.velocity.y = -(this.velocity.y * 0.5);
      this.velocity.z = this.velocity.z * 0.25;
    }
  }

  checkOverlapCandy() {
    for (let i = this.id + 1; i < numCandies; i++) {
      if (this.position.x + this.w/2 > this.others[i].position.x - this.others[i].w/2 &&
          this.position.x - this.w/2 < this.others[i].position.x + this.others[i].w/2 &&
          this.position.y + this.h/2 > this.others[i].position.y - this.others[i].h/2 &&
          this.position.y - this.h/2 < this.others[i].position.y + this.others[i].h/2 &&
          this.position.z + this.d/2 > this.others[i].position.z - this.others[i].d/2 &&
          this.position.z - this.d/2 < this.others[i].position.z + this.others[i].d/2) {
        //console.log(`bump`);
        let dx = this.position.x - this.others[i].position.x;
        this.velocity.x = this.velocity.x + map(dx, -this.w/2, this.w/2, -1, 1);
        let dy = this.position.y - this.others[i].position.y;
        this.velocity.y = this.velocity.y + map(dy, -this.h/2, this.h/2, -1, 1);
        let dz = this.position.z - this.others[i].position.z;
        this.velocity.z = this.velocity.z + map(dz, -this.d/2, this.d/2, -1, 1);
      }
    }
  }


  display() {
    push();
    translate(0, this.modelOffset, 0);
    translate(this.position);
    model(candyModel);
    pop();
  }

}
