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

let columns = 0;
let rows = 0;

let flowerColours = new Array(columns);

function setup() {
  createCanvas(1400, 1000, WEBGL);
  columns = width / 70;
  rows = height / 100;

  let xOffset = 0;
  let yOffset = 0;
  for (let x = 0; x < columns; x++) {
    flowerColours[x] = new Array(rows);
    for (let y = 0; y < rows - 1; y++)  {
      flowerColours[x][y] = map(noise(xOffset,yOffset), 0, 1, 0, 255);
      yOffset = yOffset + 1;
    }
    xOffset = xOffset + 0.7;
  }
}

// draw()
//
// Description of draw() goes here.
function draw() {
  background(255);
  rotateX(PI/3);
  writeColumnsAndRows();
}

function drawFlower(x, y, pedalsR, pedalsG, pedalsB) {
  push();
  translate(30, 30);
  translate(x, y);
  rotateX(-PI/2);
  fill(pedalsR, pedalsG, pedalsB);
  drawPedals();
  drawBulb();
  drawStem();
  pop();
}

function drawBulb() {
  strokeWeight(0.5);
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

function writeColumnsAndRows() {
  translate(-width/2, -height/2);
  for (let x = 0; x < columns; x++) {
    for (let y = 0; y < rows - 1; y++) {
      // draw grass
      push();
      translate(0, 0, -70);
      noStroke();
      fill(181, 225, 174);
      rect(x * 70, y * 100, 70, 100);
      pop();
      drawFlower(x * 70, y * 100, flowerColours[x], flowerColours[y], flowerColours[x][y]);
    }
  }
}
