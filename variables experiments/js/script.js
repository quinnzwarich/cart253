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


  circle.x = circle.x + circle.speed;

  circle.size = map(mouseY, 0, height, 100, 500);
  circle.x = constrain(circle.x, 0, width)
  circle.fill = map(circle.x, 0, width, 0, 255);

  noStroke();
  fill(circle.fill);
  ellipse(circle.x, circle.y, circle.size);

}
