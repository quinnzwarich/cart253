"use strict";

/**************************************************
latest iteration

I unfortunately haven't gotten the chance to add too much over the course of the week.
I added a 3D model and also textured the actual scene from the episode
onto a cube that displays when the user walks into the room.
**************************************************/

let footsteps = [];
let tiles = [];
let curtains = [];

let footCount = 4;
let columns = 12;
let rows = 24;

let currentState;
let user;
let under;
let corridorScene;
let redroom;
let ir;
let venus;
let fr;

function preload() {
  // the footstep sounds are taken from here
  // https://freesound.org/people/Nox_Sound/sounds/490951/
  for (let i = 0; i < footCount; i++) {
    let footstep = loadSound(`assets/sounds/footstep${i + 1}.wav`);
    footsteps.push(footstep);
  }

  under = loadSound(`assets/sounds/Under.mp3`);
  corridorScene = createVideo(`assets/images/corridor.mp4`);
  redroom = createVideo(`assets/images/redroom.mp4`);

  // I used a sample from the dark mood woods theme for an impulse response
  // I like how it sounds as well as how it ties in another important piece of music from the episode
  ir = createConvolver(`assets/sounds/darkmoodwoodsIR.mp3`);

  // courtesy of the National Gallery of Denmark
  venus = loadModel(`assets/images/venusreducedpoly.obj`);
}

function setup() {
  createCanvas(900, 600, WEBGL);
  userStartAudio();
  masterVolume(0);

  fr = createP(``);

  corridorScene.hide();
  redroom.hide();

  under.disconnect();
  ir.process(under);
  ir.process(redroom);

  currentState = new WalkThroughCorridor();

  // I am using the p5 rovercam library for movement
  user = new User();
  user.setState({
    position: [(width / 18) * 11, 150, (rows * 50) - 100],
    rotation: [-PI / 2, 0, 0],
    speed: 0.75,
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
      return;
    }
    // rotate right with D
    if (keyIsDown(68)) {
      this.yaw(0.05);
      return;
    }
  }

  // render floor
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      let tile = new Chevron(i * 100, j * 50);
      tiles.push(tile);
    }
  }

  //render curtains
  let leftmostWall = new Wall(-1200, 0, PI / 2);
  curtains.push(leftmostWall);

  for (let i = 0; i < 124; i++) {
    let leftWall = new Corridor(-1200, 200, PI / 2, i);
    curtains.push(leftWall);
  }

  // let frontWall = new InvertedWall(-1200, -50, PI);
  // curtains.push(frontWall);
  //
  // let backWall = new Wall(-1200, -1200, PI);
  // curtains.push(backWall);
  //
  // let rightmostWall = new InvertedWall(-1200, 1150, PI / 2);
  // curtains.push(rightmostWall);
}

function draw() {
  currentState.draw();
  fr.html(floor(frameRate()));
}

function keyPressed() {
  currentState.keyPressed();
}
