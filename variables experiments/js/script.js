/**************************************************
Template p5 project
Pippin Barr

Here is a description of this template p5 project.
**************************************************/

let backgroundShade = 0;

let circle = {
  x: 0,
  y: 500,
  size: 200,
  speed: 2
};

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
  background(backgroundShade);
  circle.x = circle.x + circle.speed;
  noStroke();
  ellipse(circle.x, circle.y, circle.size);
}
