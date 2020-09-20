/**************************************************
Template p5 project
Pippin Barr

Here is a description of this template p5 project.
**************************************************/

let backgroundShade = 0;

let circle = {
  x: 500,
  y: 500,
  size: 200,
  speed: 2,
  fill: 0
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

  circle.speed = random(-5, 5);
  circle.x = circle.x + circle.speed;
  circle.y = circle.y - circle.speed;

  noStroke();
  circle.fill = random(0, 255);
  fill(circle.fill);
  ellipse(circle.x, circle.y, circle.size);

}
