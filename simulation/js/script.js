"use strict";

/**************************************************
Template p5 proyect
Pippin Barr

Here is a description of this template p5 proyect.
**************************************************/

let pedals = {
  x1: 0,
  y1: 30,
  x2: 0,
  y2: 0,
  x3: 10,
  y3: 20
}

let stem = {
  x1: 0,
  y1: 30,
  x2: 0,
  y2: 60
}

let bulb = {
  x: 0,
  y: 0
}

let user = {
  vy: 0,
  ay: 0,
  maxSpeed: 0.1,
  accel: 0.01,
  move: 0
}

let columns = 0;
let rows = 0;
let flowerColours = new Array(columns);
let polySynth;

function setup() {
let cnv = createCanvas(2800, 2000, WEBGL);
let cnvX = (windowWidth - width) / 2;
let cnvY = (windowHeight - height) / 2;
cnv.position(cnvX, cnvY)

polySynth = new p5.PolySynth();

columns = width / 70;
rows = height / 100;
}

// draw()
//
// Description of draw() goes here.
function draw() {
  background(255);

  movement();
  writeArray();

  push();
  rotateX(PI/2.25);
  writeColumnsAndRows();
  pop();

}

function drawFlower(x, y, pedalsR, pedalsG, pedalsB) {
  push();
  translate(30, 30);
  translate(x, y);
  rotateX(-PI/2);
  strokeWeight(2);
  stroke(255);
  fill(pedalsR, pedalsG, pedalsB);
  drawPedals();
  drawBulb();
  drawStem();
  pop();
}

function drawBulb() {
  ellipse(bulb.x, bulb.y, 10);
}

function drawPedals() {
  for (let numPedals = 0; numPedals < 8; numPedals++) {
    rotate(PI/4);
    triangle(pedals.x1, pedals.y1, pedals.x2, pedals.y2, pedals.x3, pedals.y3);
  }
}

function drawStem() {
  line(stem.x1, stem.y1, stem.x2, stem.y2);
}

function writeArray() {
  // two dimensional array stores values for noise space
  // offsets progress through these values
  let xOffset = 0;
  let yOffset = user.move;
  for (let x = 0; x < columns; x++) {
    flowerColours[x] = new Array(rows);
    for (let y = 0; y < rows - 1; y++)  {
      flowerColours[x][y] = map(noise(xOffset,yOffset), 0, 1, 0, 255);
      yOffset = yOffset + 1;
      // play notes according to d maj pentatonic and f# min pentatoni
      if (flowerColours[y] > 155 && flowerColours[x][y] <= 165) {
        polySynth.play('D3', 0.1, 0, 1);
      }
      else if (flowerColours[y] > 165 && flowerColours[x][y] <= 175) {
        polySynth.play('E3', 0.1, 0, 1);
      }
      else if (flowerColours[y] > 175 && flowerColours[x][y] <= 185) {
        polySynth.play('F#3', 0.1, 0, 1);
      }
      else if (flowerColours[y] > 185 && flowerColours[x][y] <= 195) {
        polySynth.play('A3', 0.1, 0, 1);
      }
      else if (flowerColours[y] > 195 && flowerColours[x][y] <= 205) {
        polySynth.play('B3', 0.1, 0, 1);
      }
      else if (flowerColours[y] > 205 && flowerColours[x][y] <= 215) {
        polySynth.play('F#4', 0.1, 0, 1);
      }
      else if (flowerColours[y] > 215 && flowerColours[x][y] <= 225) {
        polySynth.play('A4', 0.1, 0, 1);
      }
      else if (flowerColours[y] > 225 && flowerColours[x][y] <= 235) {
        polySynth.play('B4', 0.1, 0, 1);
      }
      else if (flowerColours[y] > 235 && flowerColours[x][y] <= 245) {
        polySynth.play('C#5', 0.1, 0, 1);
      }
      else if (flowerColours[y] > 245 && flowerColours[x][y] <= 255) {
        polySynth.play('E5', 0.1, 0, 1);
      }
    }
    xOffset = xOffset + 0.7;
  }
}

function writeColumnsAndRows(x, y) {
  translate(-width/2, -height/2);
  for (let x = 0; x < columns; x++) {
    for (let y = 0; y < rows - 1; y++) {
      // draw grass
      push();
      translate(0, 0, -70);
      noStroke();
      fill(211, 255, 204);
      rect(x * 70, y * 100, 70, 100);
      pop();
      //choose when to draw a flower
      if (flowerColours[x][y] > 155) {
        drawFlower(x * 70, y * 100, flowerColours[x], flowerColours[y], flowerColours[x][y]);
      }
    }
  }
}

function movement() {
  // user moves forward through pressing the mouse
  if (mouseIsPressed) {
    user.ay = user.accel;
  }
  else if (!(mouseIsPressed) && user.vy > 0) {
    user.ay = -user.accel;
  }
  user.vy = user.vy + user.ay;
  user.vy = constrain(user.vy, 0, user.maxSpeed);
  user.move = user.move - user.vy;
}
