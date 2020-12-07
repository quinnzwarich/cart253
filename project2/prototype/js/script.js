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
let coordinatesI = [];
let coordinatesJ = [];
let sycamores = [];

let footCount = 4;
let numTrees = 16;
let polygons = 150;
let columns = 12;
let rows = 24;
let imageColumns = 128;
let imageRows = 128;

let currentState;
let user;
let laura;
let gothic;
let under;
let corridorScene;
let redroomScene;
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

  laura = loadImage(`assets/images/editedlaura.png`);
  gothic = loadFont(`assets/images/National-Gothic.otf`);
  under = loadSound(`assets/sounds/Under.mp3`);
  corridorScene = createVideo(`assets/images/corridor.mp4`);
  redroomScene = createVideo(`assets/images/redroom.mp4`);

  // I used a sample from the dark mood woods theme for an impulse response
  // I like how it sounds as well as how it ties in another important piece of music from the episode
  ir = createConvolver(`assets/sounds/darkmoodwoodsIR.mp3`);

  // courtesy of the National Gallery of Denmark
  venus = loadModel(`assets/images/venusreducedpoly.obj`);
}

function setup() {
  createCanvas(900, 600, WEBGL);
  pixelDensity(1);
  textFont(gothic);
  userStartAudio();

  //fr = createP(``);

  corridorScene.hide();
  redroomScene.hide();
  redroomScene.volume(0);

  under.disconnect();
  ir.process(under);

  currentState = new WalkThroughCorridor();

  // I am using the p5 rovercam library for movement
  user = new User();
  user.setState({
    position: [(width / 18) * 11, 150, (rows * 50) - 100],
    rotation: [-PI/2, 0, 0],
    speed: 0.5,
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

  // gather data from image of laura for sycamore coordinates
  laura.loadPixels();
  for (let i = 0; i < imageColumns; i++) {
    for (let j = 0; j < imageRows; j++) {
      let index = (i + j * imageRows) * 4;
      let r = laura.pixels[index + 0];
      let g = laura.pixels[index + 1];
      let b = laura.pixels[index + 2];
      let bright = (r + g + b) / 3;
      if (bright < 10) {
        coordinatesI.push(i);
        coordinatesJ.push(j);
      }
    }
  }

  // render sycamores
  // for (let i = 0; i < numTrees; i++) {
  //   let sycamore = new Sycamore(i * 32, 0, 175,
  //       random(coordinatesI), random(coordinatesJ), 175,
  //       random(coordinatesI), random(coordinatesJ), 175,
  //       random(coordinatesI), random(coordinatesJ), 175,
  //       random(coordinatesI), random(coordinatesJ), 175,
  //       random(coordinatesI), random(coordinatesJ), 175,
  //       random(coordinatesI), random(coordinatesJ), 175,
  //       random(coordinatesI), random(coordinatesJ), 175,
  //       random(coordinatesI), random(coordinatesJ), 175, i);
  //       sycamores.push(sycamore);
  // }

  // render floor
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      let tile = new Chevron(i * 100, j * 50);
      tiles.push(tile);
    }
  }

  //render curtains
  for (let i = 0; i < polygons; i++) {
    let leftmostWall = new Wall(-1200, 0, PI / 2, i);
    curtains.push(leftmostWall);
  }

  for (let i = 0; i < polygons; i++) {
    let leftWall = new Wall(-1200, 200, PI / 2, i);
    curtains.push(leftWall);
  }

  for (let i = 0; i < polygons; i++) {
    let frontWall = new InvertedWall(-1200, -50, PI, i);
    curtains.push(frontWall);
  }

  for (let i = 0; i < polygons; i++) {
    let backWall = new Wall(-1200, -1200, PI, i);
    curtains.push(backWall);
  }

  for (let i = 0; i < polygons; i++) {
    let rightmostWall = new InvertedWall(-1200, 1150, PI / 2, i);
    curtains.push(rightmostWall);
  }
}

function draw() {
  currentState.draw();
  //fr.html(floor(frameRate()));
}

function keyPressed() {
  currentState.keyPressed();
}
