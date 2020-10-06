"use strict";

/**************************************************
Template p5 project
Pippin Barr

Here is a description of this template p5 project.
**************************************************/

let pedals = {
  x1: 0,
  y1: -5,
  x2: 0,
  y2: -35,
  x3: 10,
  y3: -15
}

let stem = {
  x1: 0,
  y1: 35,
  x2: 0,
  y2: 65
}

let columns = 0;

let rows = 0;

function setup() {
  createCanvas(1000, 1000);
}

// draw()
//
// Description of draw() goes here.
function draw() {
  background(255);

  drawFlower();
}

function drawFlower() {
  drawBulb();
  drawPedals();
  drawStem();
}

function drawBulb() {
  strokeWeight(0.5);
  translate(width/2, height/2);
  ellipse(0, 0, 10);
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

function writeColumns() {
  for (let j = 0; j)
}
