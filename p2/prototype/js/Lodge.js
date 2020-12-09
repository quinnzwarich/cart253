class Lodge extends State {
  constructor() {
    super();
    this.roomDistance = 0;
    this.audioMod = 0;
    this.userSize = width / 12;
    this.tileMap = undefined;
  }

  draw() {
    background(0);
    super.draw();

    // only displays tiles from the room the user is in to save frame rate 
    for (let i = 0; i < tiles.length; i++) {
      if (this.tileMap[i] === 1) {
        let tile = tiles[i];
        tile.display();
      }
    }

    this.drawCurtains();
    this.drawFurniture();
    this.displayVideo();
    this.keyPressed();
    this.modulateAudio();
    this.walk();
  }

  drawCurtains() {}

  drawFurniture() {}

  // textures video to a cube that follows the player
  displayVideo() {}

  keyPressed() {
    super.draw();
  }

  // sets the rate of the loop depending on where the user is in the lodge
  modulateAudio() {
    this.roomDistance = dist(user.position.x, user.position.z, 1050, 600);
    this.audioMod = map(this.roomDistance, 0, 848.5, 0.5, 1);
    this.audioMod = constrain(this.audioMod, 0.5, 1);
    under.rate(this.audioMod);
  }

  // plays random footsteps after a certain amount frames has elapsed
  walk() {
    if (keyIsDown(87) || keyIsDown(83)) {
      let previous = frameCount;
      this.wait.push(previous);
    }
    if (this.wait.length >= this.stepSize) {
      let gait = random(footsteps);
      gait.play();
      ir.process(gait);
      this.wait.splice(0, this.wait.length - 1);
    }
  }
}
