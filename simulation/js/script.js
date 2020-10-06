"use strict";

/**************************************************
Template p5 project
Pippin Barr

Here is a description of this template p5 project.
**************************************************/

let angleX = 0;
let angleY = 0;

function setup() {
  createCanvas(1000, 1000, WEBGL);
}

// draw()
//
// Description of draw() goes here.
function draw() {
  background(255);

  strokeWeight(5);
  stroke(0);
  translate(0, 0, 0);
  rotateX(angleX);
  rotateY(angleY);
  beginShape();
  vertex(300, 0, 0)
  vertex(-212, -212, 0);
  vertex(-400, 0, 0);
  vertex(300, 0, 0);
  endShape();
  push();
  beginShape();
  rotateX(PI/2);
  vertex(300, 0, 0)
  vertex(-212, -212, 0);
  vertex(-400, 0, 0);
  vertex(-212, 212, 0);
  vertex(300, 0, 0);
  endShape();
  pop();
  push();
  beginShape();
  rotateY(PI/2);
  translate(0, 0, -212);
  vertex(-212, 0, 0);
  vertex(212, 0, 0);
  vertex(0, -212, 0);
  vertex(-212, 0, 0);
  endShape();
  pop();

  angleX = angleX + 0.01;
  angleY = angleY + 0.05;
}
