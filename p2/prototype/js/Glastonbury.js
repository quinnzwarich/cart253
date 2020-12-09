class Glastonbury extends State {
  constructor() {
    super();
  }

  draw() {
    background(8, 16, 32);
    super.draw();
    this.drawTerrain();
    this.drawSycamores();
    this.drawCurtains();
    //this.walk();
    this.checkIfOutOfGlastonbury();
  }

  keyPressed() {
    super.keyPressed();
  }

  drawTerrain() {
    terrain.display();
  }

  // draws the 2 sycamores next to the portal and the others in a ring
  drawSycamores() {
    for (let i = 0; i < sycamores.length; i++) {
      let sycamore = sycamores[i];
      if (i === sycamores.length - 1) {
        push();
        translate(1275, -212, 1300);
        rotateY(PI);
        sycamore.display();
        pop();
      } else if (i === sycamores.length - 2) {
        push();
        translate(625, -212, 1300);
        sycamore.display();
        pop();
      } else {
        push();
        translate(
          terrainCoordinates[i].x / 2 + 750,
          -212,
          terrainCoordinates[i].y / 2 + 750
        );
        sycamore.display();
        pop();
      }
    }
  }

  // has the curtains become less transparent the closer the user is to the entrance
  drawCurtains() {
    transparency = map(
      dist(user.position.x, user.position.z, 550, 1175),
      802.65,
      0,
      0,
      255
    );
    for (let i = 0; i < curtains.length; i++) {
      if (i > 450 && i < 600) {
        let curtain = curtains[i];
        curtain.display();
      }
    }
  }

  // decided not to use the grass footsteps as they cause a strange flashing bug
  // c'est la vie
  walk() {
    if (keyIsDown(87) || keyIsDown(83)) {
      let previous = frameCount;
      this.wait.push(previous);
    }
    if (this.wait.length >= this.stepSize) {
      let gait = random(grassyFootsteps);
      gait.disconnect();
      ir.process(gait);
      this.wait.splice(0, this.wait.length - 1);
    }
  }

  // check to see if the user has entered the corridor
  checkIfOutOfGlastonbury() {
    if (user.position.x < 650 && user.position.x > 450) {
      if (user.position.z <= 1175) {
        currentState = new WalkThroughCorridor();
      }
    }
  }
}
