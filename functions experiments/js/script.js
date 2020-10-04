/**************************************************
Template p5 project
Pippin Barr

Here is a description of this template p5 project.
**************************************************/

let circle = {
  x: 0,
  y: 250,
  size: 100,
  vx: 1,
  vy: 0
}

// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(500, 500);
}

// draw()
//
// Description of draw() goes here.
function draw() {
  background (0);

  move();
  wrap();
  display();
}

function move() {
  circle.x = circle.x + circle.vx;
  circle.y = circle.y + circle.vy;
}

function wrap() {
  if (circle.x > width) {
    reset();
  }
}

function display() {
  fill(255, 125, 255);
  rectMode(CENTER);
  rect(circle.x, circle.y, circle.size);
}

function reset() {
  circle.x = 0;
  circle.vx = circle.vx + 2;
  circle.vy = circle.vy - 0.25;
  circle.size = circle.size + 5;
}

function mousePressed() {
  reset();
}
