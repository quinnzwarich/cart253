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

  angleMode(DEGREES);
  strokeWeight(1);
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
  translate(0, 0, 212);
  rotateX(45);
  vertex(300, -212, -212);
  vertex(-212, -300, 0);
  vertex(-212, 0, 0);
  vertex(300, -212, -212);
  endShape();
  pop();
  push();
  beginShape();
  rotateX(90);
  vertex(300, 0, 0)
  vertex(-212, -212, 0);
  vertex(-400, 0, 0);
  vertex(-212, 212, 0);
  vertex(300, 0, 0);
  endShape();
  pop();
  push();
  beginShape();
  rotateY(90);
  translate(0, 0, -212);
  //vertex(-212, 0, 0);
  vertex(212, 0, 0);
  vertex(0, -212, 0);
  vertex(-212, 0, 0);

  endShape();
  pop();

  angleX = angleX + 1;
  angleY = angleY + 1.2;
}
