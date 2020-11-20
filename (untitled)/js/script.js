"use strict";

/**************************************************
Template p5 project
Pippin Barr

Here is a description of this template p5 project.
**************************************************/

let xRotate = 0;
let yRotate = 0;

function setup() {
  createCanvas(750, 750, WEBGL);

}

function draw() {
  background(255);
  platform();
  leftWall();
  rightWall();
}

function platform() {
  push();
  beginShape();
  vertex(-width/tan(PI*30.0 / 180.0), height/2, -width/tan(PI*30.0 / 180.0));
  vertex(-width/tan(PI*30.0 / 180.0), height/2, width/2);
  vertex(width/tan(PI*30.0 / 180.0), height/2, width/2);
  vertex(width/tan(PI*30.0 / 180.0), height/2, -width/tan(PI*30.0 / 180.0));
  endShape(CLOSE);
  pop();
}

function leftWall() {
  push();
  beginShape();
  vertex(-width/tan(PI*30.0 / 180.0), height/2, width/2);
  vertex(-width/tan(PI*30.0 / 180.0), -height/tan(PI*30.0 / 180.0), width/2);
  vertex(0, -height/tan(PI*30.0 / 180.0), -width/tan(PI*30.0 / 180.0));
  vertex(0, height/2, -width/tan(PI*30.0 / 180.0));
  endShape(CLOSE);
  pop();
}

function rightWall() {
  push();
  beginShape();
  vertex(width/tan(PI*30.0 / 180.0), height/2, width/2);
  vertex(width/tan(PI*30.0 / 180.0), -height/tan(PI*30.0 / 180.0), width/2);
  vertex(0, -height/tan(PI*30.0 / 180.0), -width/tan(PI*30.0 / 180.0));
  vertex(0, height/2, -width/tan(PI*30.0 / 180.0));
  endShape(CLOSE);
  pop();
}
