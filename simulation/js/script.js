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
  vy: 0,
  ay: 0,
  maxSpeed: 2,
  accel: 0.1,
  move: 0
}

let cnv;
let font;

let r = 0;

let columns = 0;
let rows = 0;

let movements = new Array(columns);
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

  columns = width / 10;
  rows = height / 10;
}

// draw()
//
// Description of draw() goes here.
function draw() {
  if (state === `title`) {
    title();
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
    translate(0, 0, 250);
    translate(x, y, z);
    rotateX(-PI/2);
    strokeWeight(0.5);
    stroke(161, 205, 154);
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
  background(211, 204, 255);
  writeArray();

  push();
  fill(255);
  translate(0, 250, 250);
  textFont(font);
  textSize(75);
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
}

// function drawFlower(x, y, z, pedalsR, pedalsG, pedalsB, vector) {
//   push();
//   translate(0, 0, 250);
//   translate(x, y, z);
//   rotateX(-PI/2);
//   strokeWeight(0.5);
//   stroke(161, 205, 154);
//   drawStem();
//   fill(pedalsR, pedalsG, pedalsB);
//   stroke(pedalsR, pedalsG, pedalsB);
//   rotateX(PI);
//   rotateY(2 * PI);
//   drawPedals(v);
//   pop();
// }
//

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
    for (let y = 0; y < rows - 1; y++)  {
      flowerColours[x][y] = map(noise(xOffset,yOffset), 0, 1, 0, 255);
      flowerAngles[x][y] = map(noise(xOffset, yOffset), 0, 1, PI, 2 * PI);
      yOffset = yOffset + 2.5;
    }
    xOffset = xOffset + 2.5;
  }
}

function drawGrass() {
  translate(-width/2, -height/2);
  for (let x = 0; x < columns; x++) {
    for (let y = 0; y < rows - 1; y++) {
      // draw grass
      push();
      translate(0, 0, 150);
      noStroke();
      fill(211, 255, 204);
      rect(x * 10, y * 10, 10, 10);
      pop();
    }
  }
}

function drawFlowers() {
  randomSeed = (99);
  translate(-width/2, -height/2);
  for (let x = 0; x < columns; x++) {
    for (let y = 0; y < rows - 1; y++) {
      // draw patches of flowers using noise
      if (flowerColours[x][y] > 155) {
        flowers.push(drawFlower(x * 10, y * 10, 0, 255, flowerColours[x][y], flowerColours[x][y], flowerAngles[x][y]));
        movements.push(0);
    }
  }
      if (mousePressed) {
        r = int(random(flowers[0][0], flowers[columns - 1][rows - 1]));
        flowers[r][r] = drawFlower(r * 10, r * 10, 0, 255, flowerColours[r][r], flowerColours[r][r], flowerAngles[r][r])
      }
    }
  }

function movement(z) {
  levitate.ay = levitate.accel;
  levitate.vy = levitate.vy + levitate.ay;
  levitate.vy = constrain(levitate.vy, 0, levitate.maxSpeed);
  z = z + levitate.vy;
}

function mousePressed() {
  movement();
}

  // else if (!(mouseIsPressed) && user.vy > 0) {
  //   user.ay = -user.accel;
  // }
