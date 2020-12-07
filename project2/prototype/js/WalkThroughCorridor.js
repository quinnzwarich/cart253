class WalkThroughCorridor extends State {
  constructor() {
    super();
    this.corridorDistance = 0;
    this.videoMod = 0;
    this.tileMap = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  }

  draw() {
    super.draw(255);
    this.modulateVideo();
    this.checkIfOutOfCorridor();
    this.drawSycamores();
  }

  drawCurtains() {
    for (let i = 0; i < curtains.length; i++) {
      if (i < 300) {
        let curtain = curtains[i];
        curtain.display();
      }
      if (i > 415 && i < 450) {
        let curtain = curtains[i];
        curtain.display();
      }
      if (i > 565 && i < 600) {
        let curtain = curtains[i];
        curtain.display();
      }
    }
  }

  drawFurniture() {
    // draw bust
    push();
    directionalLight(255, 255, 255, -width, height, 0);
    noStroke();
    scale(0.1);
    translate(5500, 2750, 1000);
    rotateX(PI);
    rotateY(PI * 0.875);
    model(venus);
    pop();
  }

  drawSycamores() {
    // for (let i = 0; i < sycamores.length; i++) {
    //   let sycamore = sycamores[i];
    //   sycamore.display();
    // }
    // for(let i = 0; i < coordinatesI.length; i++) {
    //   for(let j = 0; j < coordinatesJ.length; j++) {
    //     push();
    //     stroke(255);
    //     strokeWeight(5);
    //     point(coordinatesI[i], coordinatesJ[j]);
    //     pop();
    //   }
    // }
  }

  displayVideo() {
    // blendMode(ADD);
    // push();
    // noStroke();
    // translate(user.position.x, user.position.y, user.position.z);
    // rotateY(PI - user.pan);
    // tint(255, 100);
    // texture(corridorScene);
    // box(width/12, height/12, width/12);
    // pop();
  }

  modulateVideo() {
    // playback contingent on position with corridor
    if (corridorScene.duration() > 0) {
      this.corridorDistance = dist(user.position.x, user.position.z, 550, 100);
      this.videoMod = map(this.corridorDistance, 1000, 0, 0, corridorScene.duration());
      this.videoMod = constrain(this.videoMod, 0, corridorScene.duration());
      corridorScene.time(this.videoMod);
    }
  }

  checkIfOutOfCorridor() {
    if (user.position.z < 1200 &&
        user.position.z > 0) {
      if (user.position.x >= 650) {
        currentState = new AndIllSeeYou();
      }
    }
  }
}
