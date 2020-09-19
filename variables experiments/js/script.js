/**************************************************
Template p5 project
Pippin Barr

Here is a description of this template p5 project.
**************************************************/

let backgroundShade = 0;
let circleSize = 200;
let circleX = 0;
let circleY = 500;
let circleSpeed = 2;

// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(1000, 1000);
}

// draw()
//
// Description of draw() goes here.
function draw() {
  backgroundShade = backgroundShade + 0.5;
  background(backgroundShade);
  circleX = circleX + circleSpeed;
  circleSpeed = circleSpeed + 0.25;
  noStroke();
  ellipse(circleX, circleY, circleSize);
}
