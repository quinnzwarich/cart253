"use strict";

/**************************************************
Template p5 proyect
Pippin Barr

Here is a description of this template p5 proyect.
**************************************************/

let pedals = {
  x1: 0,
  y1: 15,
  x2: 0,
  y2: 0,
  x3: 5,
  y3: 10
}

let stem = {
  x1: 0,
  y1: 0,
  x2: 0,
  y2: 60
}

let levitate = {
  z: 0,
  maxSpeed: 5,
  accel: 0.25,
}

let cnv;
let font;

let frames;

let columns = 0;
let rows = 0;
let scale = 50;

let movements = new Array(columns);
let zCoordinates = new Array(columns);
let flowers = new Array(columns);
let flowerAngles = new Array(columns);
let flowerColours = new Array(columns);

let state = `title`;

function preload() {
  font = loadFont('assets/fonts/england.ttf')
}

function setup() {
  let cnv = createCanvas(1000, 1000, WEBGL);
  let cnvX = (windowWidth - width) / 2;
  let cnvY = (windowHeight - height) / 2;
  cnv.position(cnvX, cnvY)

  columns = width / scale;
  rows = height / scale;

  frames = createP('');

  writeArray();
}

// draw()
//
// Description of draw() goes here.
function draw() {
  if (state === `title`) {
    title();
  }
  if (state === `lovesMe`) {
    lovesMe();
  }
}

// class Flower {
//   constructor() {
//     this.pedalX1 = 0;
//     this.pedalY1 = 15;
//     this.pedalX2 = 0;
//     this.pedalY2 = 0;
//     this.pedalX3 = 5;
//     this.pedalY3 = 10;
//     this.stemX1 = 0;
//     this.stemY1 = 0;
//     this.stemX2 = 0;
//     this.stemY2 = 60;
//   }

function drawFlower(x, y, z, pedalsR, pedalsG, pedalsB, angle) {
    push();
    translate(250, 650, 250);
    translate(x, y, z);
    rotateX(-PI/2);
    strokeWeight(0.5);
    stroke(211, 255, 204);
    drawStem();
    fill(pedalsR, pedalsG, pedalsB);
    stroke(pedalsR, pedalsG, pedalsB);
    rotateX(PI);
    rotateY(2 * PI);
    drawPedals(angle);
    pop();
  }

function drawPedals(tempAngle) {
  for (let numPedals = 0; numPedals < 8; numPedals++) {
    rotateY(tempAngle);
    rotate(PI/4);
    triangle(pedals.x1, pedals.y1, pedals.x2, pedals.y2, pedals.x3, pedals.y3);
  }
}

function drawStem() {
  line(stem.x1, stem.y1, stem.x2, stem.y2);
}

function title() {
  background(0, 127, 255);

  push();
  fill(255);
  translate(0, -275, 250);
  textFont(font);
  textSize(70);
  textAlign(CENTER, CENTER);
  text(`Field of Artificial Flowers`, 0, 0);
  pop();

  push();
  rotateX(PI/3);
  drawGrass();
  pop();
  push();
  rotateX(PI/3);
  drawFlowers();
  pop();

  frames.html(floor(frameRate()));
}

function writeArray() {
  // two dimensional array stores values for noise space
  // offsets progress through these values
  let xOffset = 0;
  let yOffset = 0;
  for (let x = 0; x < columns; x++) {
    flowerColours[x] = new Array(rows);
    flowerAngles[x] = new Array(rows);
    flowers[x] = new Array(rows);
    movements[x] = new Array(rows);
    zCoordinates[x] = new Array(rows);
    for (let y = 0; y < rows - 1; y++)  {
      flowerColours[x][y] = map(noise(xOffset,yOffset), 0, 1, 0, 255);
      flowerAngles[x][y] = map(noise(xOffset, yOffset), 0, 1, PI, 2 * PI);
      yOffset = yOffset + 1.5;

      movements[x][y] = 0;
      zCoordinates[x][y] = 0;
    }
    xOffset = xOffset + 1.5;
  }
}

function drawGrass() {
  translate(-width/2, -height/2);
  // draw grass
  push();
  translate(0, 0, 150);
  noStroke();
  fill(186, 230, 179);
  rect(-width / 4, height / 6, width * 2, height);
  pop();
}

function drawFlowers() {
  randomSeed = (99);
  translate(-width/2, -height/2);

  if (mouseIsPressed) {
    movements[randomPick.x][randomPick.y] = movements[randomPick.x][randomPick.y] + levitate.accel;
    movements[randomPick.x][randomPick.y] = constrain(movements[randomPick.x][randomPick.y], 0, levitate.maxSpeed);
    zCoordinates[randomPick.x][randomPick.y] = zCoordinates[randomPick.x][randomPick.y] + movements[randomPick.x][randomPick.y];
    console.log(zCoordinates[randomPick.x][randomPick.y]);
  }

  for (let x = 0; x < columns; x++) {
    for (let y = 0; y < rows - 1; y++) {
      // draw patches of flowers using noise
      if (flowerColours[x][y] > 155) {
        let rValue = flowerColours[x];
        if(randomPick!=undefined && x === randomPick.x && y ===randomPick.y ) {
          rValue = flowerColours[y];

        }
        drawFlower(x * scale/2, y * scale/2, zCoordinates[x][y], rValue, flowerColours[y], flowerColours[x][y], flowerAngles[x][y]);
      }
    }
  }
}

// function movement(velocity) {
//   velocity = velocity + levitate.accel;
//   velocity = constrain(velocity, 0, levitate.maxSpeed);
//   zCoordinates[x][y] = zCoordinates[x][y] + velocity;
// }

let randomPick;
let pickedFlowerZ = 0;

function mousePressed() {
  randomPick = {
    x: floor(random(columns)),
    y: floor(random(rows))
  };

  while(flowerColours[randomPick.x][randomPick.y] <= 155) {
    randomPick = {
      x: floor(random(columns)),
      y: floor(random(rows))
    };
  }
}

  // else if (!(mouseIsPressed) && user.vy > 0) {
  //   user.ay = -user.accel;
  // }
