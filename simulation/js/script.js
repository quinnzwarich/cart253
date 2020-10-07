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
  createCanvas(1400, 1000);

  columns = width / 70;
  rows = height / 100;
}

// draw()
//
// Description of draw() goes here.
function draw() {
  background(255);
  //drawFlower();
  //drawFlower();
  //translate(width/2, height/2);
  //rotateX(PI/3);
  writeColumnsAndRows();
  //drawFlower(0, 0);

}

function drawFlower(x, y) {
  translate(30, 30);
  drawPedals(x + pedals.x1, y + pedals.y1, x + pedals.x2, y + pedals.y2, x + pedals.x3, y + pedals.y3);
  drawBulb(x + bulb.x, y + bulb.y);
  drawStem(x + stem.x1, y + stem.y1, x + stem.x2, y + stem.y2);
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
  //translate(-width/2, -height/2);
  for (let k = 0; k < columns; k++) {
    for (let j = 0; j < rows; j++) {
      //rect(k * 70, j * 100, 70, 100);
      drawFlower(k * 70, j * 100);
    }
  }
}
