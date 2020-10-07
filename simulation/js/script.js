"use strict";

/**************************************************
Template p5 project
Pippin Barr

Here is a description of this template p5 project.
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

function setup() {
  createCanvas(1400, 1000, WEBGL);
  columns = width / 70;
  rows = height / 100;
}

// draw()
//
// Description of draw() goes here.
function draw() {
  background(255);

  //translate(width/2, height/2);
  rotateX(PI/3);
  writeColumnsAndRows();
}

function drawFlower(x, y) {
  push();
  translate(30, 30);
  translate(x, y);
  rotateX(-PI/2);
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
  for (let k = 0; k < columns; k++) {
    for (let j = 0; j < rows; j++) {
      drawFlower(k * 70, j * 100);
    }
  }
}
