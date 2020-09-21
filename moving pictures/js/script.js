/**************************************************
Template p5 project
Pippin Barr

Here is a description of this template p5 project.
**************************************************/

let backgroundShade = 0;

let circle = {
  x: 0,
  y: 500,
  size: 250,
  speed: 2,
}

let circle2 = {
  x: 1000,
  y: 500,
  size: 200,
  speed: 2,
}

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
  background(backgroundShade, 0, 0);
  backgroundShade = map(circle.x, 0, width/2, 0, 255);


  circle.x = circle.x + circle.speed;
  circle.y = map(circle.x, 0, width/2, 500, 375);
  circle.size = circle.size - circle.speed;
  circle.x = constrain(circle.x, 0, width/2);


  circle2.x = circle2.x - circle2.speed;
  circle2.y = map(circle2.x, width/2, width, 625, 500);
  circle2.size = circle2.size - circle2.speed;
  circle2.x = constrain(circle2.x, width/2, width);

  noStroke();
  fill(255, 255, 255, 200);
  ellipse(circle.x, circle.y, circle.size);

  noStroke();
  fill(255, 255, 255, 225);
  ellipse(circle2.x, circle2.y, circle2.size);

}
