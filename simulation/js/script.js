"use strict";

/**************************************************
Template p5 project
Pippin Barr

Here is a description of this template p5 project.
**************************************************/

// let pedals = {
//   x1: 0,
//   y1: -5,
//   x2: 0,
//   y2: -35,
//   x3: 10,
//   y3: -15
// }
//
// let stem = {
//   x1: 0,
//   y1: 35,
//   x2: 0,
//   y2: 65
// }

let columns = 0;
let rows = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);

  columns = width / 70;
  rows = height / 100;
}

// draw()
//
// Description of draw() goes here.
function draw() {
  background(255);
  //drawFlower(0, 0);
  writeColumnsAndRows();

}

function drawFlower(x, y) {
  translate(30, 30);
  drawBulb(x, y);
  drawPedals(x, y, x, y);
  drawStem(x, y, x, y, x, y);
}

function drawBulb(bulbX = 0, bulbY = 0) {
  strokeWeight(0.5);
  ellipse(bulbX, bulbY, 10);
}

function drawPedals(pedalX1 = 0, pedalY1 = 1, pedalX2 = 0, pedalY2 = 0, pedalX3 = 1, pedalY3 = 1) {
  for (let numPedals = 0; numPedals < 8; numPedals++) {
    rotate(PI/4);
    triangle(pedalX1, pedalY1 * 30, pedalX2, pedalY2, pedalX3 * 10, pedalY3 * 20);
  }
}

function drawStem(stemX1 = 0, stemY1 = 1, stemX2 = 0, stemY2 = 1) {
  line(stemX1, stemY1 * 30, stemX2, stemY2 * 60);
}

function writeColumnsAndRows() {
  for (let k = 0; k < columns; k++) {
    for (let j = 0; j < rows; j++) {
      //rect(k * 70, j * 100, 70, 100);
      drawFlower(k * 70, j * 100);
    }
  }
}
