class AndIllSeeYou extends Lodge {
  constructor() {
    super();
    this.lighting = 0;
    this.inverse = 0;
    this.tileMap = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  }


  draw() {
    ambientLight(this.lighting);
    super.draw();
    this.strobe();
    this.checkIfOver();
  }

  // doesn't display the curtains from the corridor to save frame rate
  drawCurtains() {
    for (let i = 0; i < curtains.length; i++) {
      if (i > 150 && i < 425) {
        let curtain = curtains[i];
        curtain.display();
      }
      if (i > 450 && i < 575) {
        let curtain = curtains[i];
        curtain.display();
      }
      if (i > 600) {
        let curtain = curtains[i];
        curtain.display();
      }
    }
  }

  // transparency follows the strobing
  displayVideo() {
    redroomScene.play();
    blendMode(ADD);
    push();
    noStroke();
    translate(user.position.x, user.position.y, user.position.z);
    rotateY(PI - user.pan);
    tint(255, this.inverse);
    texture(redroomScene);
    box(this.userSize, height/12, this.userSize);
    pop();
  }

  // uses sin to make a strobing effect similar to lighting from the episode
  // uses the drop in frame rate to great effect !
  strobe() {
    this.lighting = map(sin(this.lighting + (PI / 32)), 0, 1, 0, 255);
    this.inverse = map(this.lighting, 0, 255, 255, 0);
  }

  // if the video finishes, go to the end
  checkIfOver() {
    if (redroomScene.time() >= redroomScene.duration() - 1) {
      masterVolume(0);
      currentState = new End();
    }
  }
}
