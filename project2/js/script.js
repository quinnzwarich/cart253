"use strict";

/**************************************************
beyond life and death
quinn zwarich

meet your destiny in the black lodge.
**************************************************/

let footsteps = [];
let grassyFootsteps = [];
let tiles = [];
let curtains = [];
let coordinates = [];
let noiseValues = [];
let sycamores = [];
let terrainCoordinates = [
  { x: 2646.25, y: 675 },
  { x: 2084.75, y: 2217.69 },
  { x: 663.0, y: 3038.53 },
  { x: -953.75, y: 2753.46 },
  { x: -2009.01, y: 1495.84 },
  { x: -2009.01, y: -145.84 },
  { x: -953.75, y: -1403.46 },
  { x: 663.0, y: -1688.53 },
  { x: 2084.75, y: -867.69 },
];

let footCount = 4;
let numTrees = 11;
let polygons = 150;
let columns = 12;
let rows = 24;
let imageColumns = 512;
let imageRows = 512;
let transparency = 255;
let lighting = 0;

let currentState;
let user;
let terrain;
let laura;
let under;
let corridorScene;
let redroomScene;
let ir;
let venus;
let fr;

function preload() {
  for (let i = 0; i < footCount; i++) {
    let footstep = loadSound(`assets/sounds/grassyFootstep${i + 1}.mp3`);
    grassyFootsteps.push(footstep);
  }
  for (let i = 0; i < footCount; i++) {
    let footstep = loadSound(`assets/sounds/footstep${i + 1}.wav`);
    footsteps.push(footstep);
  }

  venus = loadModel(`assets/images/venusreducedpoly.obj`);
  laura = loadImage(`assets/images/editedlaura.png`);
  under = loadSound(`assets/sounds/Under.mp3`);
  corridorScene = createVideo(`assets/images/corridor.mp4`);
  redroomScene = createVideo(`assets/images/redroom.mp4`);

  // I used a sample from the dark mood woods theme for an impulse response
  // I like how it sounds as well as how it ties in another important piece of music from the episode
  ir = createConvolver(`assets/sounds/darkmoodwoodsIR.mp3`);
}

function setup() {
  createCanvas(900, 600, WEBGL);
  pixelDensity(1);
  userStartAudio();

  corridorScene.hide();
  redroomScene.hide();
  redroomScene.volume(0);

  under.disconnect();
  ir.process(under);

  currentState = new Glastonbury();

  user = new User();
  user.setState({
    position: [1000, 150, 1843],
    rotation: [-PI / 2, 0, 0],
    speed: 0.37,
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
  };

  // render portal
  terrain = new Terrain(40 + 206.25, 525 + 150, -30);

  // gather data from image of laura for sycamore coordinates
  laura.loadPixels();
  for (let j = 0; j < imageRows; j += 4) {
    for (let i = 0; i < imageColumns; i += 4) {
      let index = (j * imageRows + i) * 4;
      let r = laura.pixels[index + 0];
      let g = laura.pixels[index + 1];
      let b = laura.pixels[index + 2];
      let a = laura.pixels[index + 3];
      let bright = (r + g + b) / 3;
      let brightAlpha = (r + g + b + a) / 4;
      if (bright < 1 && !brightAlpha < 1) {
        coordinates.push({ x: i, y: j });
      }
    }
  }

  // render sycamores
  for (let i = 0; i < numTrees; i++) {
    let o = floor(random(3110, 3116));
    let r1 = floor(random(1558, 3116));
    let r2 = floor(random(558, 1558));
    let r3 = floor(random(0, 558));
    let r4 = floor(random(1558, 3116));
    let r5 = floor(random(1558, 3116));
    let r6 = floor(random(558, 1558));
    let r7 = floor(random(558, 1558));
    let r8 = floor(random(0, 558));
    let sycamore = new Sycamore(
      coordinates[o].x,
      coordinates[o].y,
      0,
      coordinates[r1].x,
      coordinates[r1].y,
      random(-64, 64),
      coordinates[r2].x,
      coordinates[r2].y,
      random(-64, 64),
      coordinates[r3].x,
      coordinates[r3].y,
      random(-64, 64),
      coordinates[r4].x,
      coordinates[r4].y,
      random(-128, 128),
      coordinates[r5].x,
      coordinates[r5].y,
      random(-128, 128),
      coordinates[r6].x,
      coordinates[r6].y,
      random(-128, 128),
      coordinates[r7].x,
      coordinates[r7].y,
      random(-128, 128),
      coordinates[r8].x,
      coordinates[r8].y,
      random(-128, 128),
      i
    );
    sycamores.push(sycamore);
  }

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
}

function keyPressed() {
  currentState.keyPressed();
}
