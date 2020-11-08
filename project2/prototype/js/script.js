"use strict";

/**************************************************
Template p5 project
Pippin Barr

Here is a description of this template p5 project.
**************************************************/

let footsteps = [];
let tiles = [];
let curtains = [];

let footCount = 5;
let columns = 12;
let rows = 24;

let user;
let under;

function preload() {
  for (let i = 0; i < footCount; i++) {
    let footstep = loadSound(`assets/sounds/footstep${i + 1}.wav`);
    footsteps.push(footstep);
  }

  under = loadSound(`assets/sounds/Under.mp3`);
}

function setup() {
  createCanvas(900, 600, WEBGL);
  userStartAudio();

  user = new User();
  user.setState({
    position: [(width / 18) * 11, 150, (rows * 50) - 100],
    rotation: [-PI / 2, 0, 0],
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
      this.yaw(-0.05);
    }
    // rotate right with D
    if (keyIsDown(68)) {
      this.yaw(0.05);
    }
  }

  // render floor
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      let tile = new Chevron(i * 100, j * 50);
      tiles.push(tile);
    }
  }

  // render curtains
  let leftmostWall = new VerticalWall(-1200, 0);
  curtains.push(leftmostWall);

  let leftWall = new Corridor(-1200, 200);
  curtains.push(leftWall);

  let rightmostWall = new VerticalWall(-1200, 1150);
  curtains.push(rightmostWall);

  let frontWall = new HorizontalWall(-1200, -50);
  curtains.push(frontWall);

  let backWall = new HorizontalWall(-1200, -1200);
  curtains.push(backWall);
}

// draw()
//
// Description of draw() goes here.
function draw() {
  background(0);

  for (let i = 0; i < tiles.length; i++) {
    let tile = tiles[i];
    tile.display();
  }

  for (let i = 0; i < curtains.length; i++) {
    let curtain = curtains[i];
    curtain.display();
  }
}

// function keyPressed() {
//   let gait = random(footsteps);
//   if (keyIsDown(87) || keyIsDown(83) || keyIsDown(65) || keyIsDown(68) && (!gait.isPlaying())) {
//     gait.rate(-1);
//     gait.loop();
//   }
// }
//
// function keyReleased() {
//   let gait = random(footsteps);
//   gait.stop();
// }
