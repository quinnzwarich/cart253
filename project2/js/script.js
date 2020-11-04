"use strict";

/**************************************************
Template p5 project
Pippin Barr

Here is a description of this template p5 project.
**************************************************/

let tiles = [];
let curtains = [];
let columns = 7.5;
let rows = 30;

let user;

// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(750, 750, WEBGL);

  user = new User();
  user.setState({
    position: [1150, 150, width],
    rotation: [-PI, 0, 0],
    speed: 2,
  });

  // override controls to prevent user from moving up or down
  user.controller = function () {
    // move forward with W
    if (keyIsDown(87)) {
      this.moveX(this.speed);
    }
    // move backwards with S
    if (keyIsDown(83)) {
      this.moveX(-this.speed);
    }
    // rotate left with A
    if (keyIsDown(65)) {
      this.yaw(-0.08);
    }
    // rotate right with D
    if (keyIsDown(68)) {
      this.yaw(0.08);
    }
  };

  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      let tile = new Chevron(i * 100, j * 50);
      tiles.push(tile);
    }
  }

  for (let i = 0; i < columns * 2; i++) {
    let curtain = new Curtain(-100 * i, 0);
    curtains.push(curtain);
  }
}

// draw()
//
// Description of draw() goes here.
function draw() {
  background(0);

  console.log(user.position);

  for (let i = 0; i < tiles.length; i++) {
    let tile = tiles[i];
    tile.display();
  }

  for (let i = 0; i < curtains.length; i++) {
    let curtain = curtains[i];
    curtain.display();
  }
}
