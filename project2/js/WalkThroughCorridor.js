class WalkThroughCorridor extends Lodge {
  constructor() {
    super();
    this.corridorDistance = 0;
    this.transparency = 0;
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
  }

  // displays all of the curtains so they don't have to load as the user enters the main room 
  drawCurtains() {
    transparency = 255;
    for (let i = 0; i < curtains.length; i++) {
      let curtain = curtains[i];
      curtain.display();
    }
  }

  // draws the bust
  drawFurniture() {
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

  // has the video become less transparent depending on where the user is in the corridor
  displayVideo() {
    blendMode(ADD);
    this.transparency = map(this.corridorDistance, 1100, 0, 0, 127);
    push();
    noStroke();
    translate(user.position.x, user.position.y, user.position.z);
    rotateY(PI - user.pan);
    tint(255, this.transparency);
    texture(corridorScene);
    box(width/12, height/12, width/12);
    pop();
  }

  // sets the playback of the video depending on where the user is in the corridor
  modulateVideo() {
    if (corridorScene.duration() > 0) {
      this.corridorDistance = dist(user.position.x, user.position.z, 550, 100);
      this.videoMod = map(this.corridorDistance, 1100, 0, 0, corridorScene.duration());
      this.videoMod = constrain(this.videoMod, 0, corridorScene.duration());
      corridorScene.time(this.videoMod);
    }
  }

  // check to see if the user has entered the main room
  checkIfOutOfCorridor() {
    if (user.position.z < 1200 &&
        user.position.z > 0) {
      if (user.position.x >= 675) {
        currentState = new AndIllSeeYou();
      }
    }
  }
}
