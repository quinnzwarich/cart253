class AndIllSeeYou extends State {
  constructor() {
    super();
    this.total = 0;
    this.lighting = 0;
    this.values = [];
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
    super.draw();
    
  }

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

  displayVideo() {
    redroomScene.play();
    blendMode(ADD);
    push();
    noStroke();
    translate(user.position.x, user.position.y, user.position.z);
    rotateY(PI - user.pan);
    tint(255, 100);
    texture(redroomScene);
    box(this.userSize, height/12, this.userSize);
    pop();
  }

  strobe() {
    redroomScene.loadPixels();
    for (let i = 0; i < height; i+= 8) {
      for (let j = 0; j < width; j+= 8) {
        let offset = ((i * width) + j) * 4;
        this.values.push((redroom.pixels[offset] +
        redroom.pixels[offset + 1] +
        redroom.pixels[offset + 2]) / 3);
        this.total += this.values[offset];
        if (j >= width) {
          this.lighting = this.total / this.values.length;
          this.values.splice(0, this.values.length - 1);
          this.total = 0;
        }
      }
    }

  }
}
