/**************************************************
Template p5 project
Pippin Barr

Here is a description of this template p5 project.
**************************************************/

// setup()
//
// Description of setup() goes here.
function setup() {

  createCanvas(500, 500);

  background(500, 500, 500);

  let c = color(128, 64, 32);

  // head
  fill(c);
  ellipse(100, 125, 125, 140);
  ellipse(400, 125, 125, 140);
  fill(256, 128, 64);
  ellipse(400, 125, 62, 70);
  ellipse(100, 125, 62, 70);
  fill(c);
  ellipse(250, 250, 450, 375);


  // eyes
  ellipseMode(CORNER);
  fill(500, 500, 500);
  ellipse(100, 150, 120, 120);
  ellipse(280, 150, 120, 120);
  fill(0);
  ellipse(100, 150, 100, 100);
  ellipse(280, 150, 100, 100);

  // nose
  ellipse(225, 300, 50, 25);

  // helmet
  ellipseMode(CORNER);
  noStroke();
  fill(200, 200, 255, 100);
  ellipse(0, -15, 500, 475);
  stroke(200, 200, 255);
  strokeWeight(50);
  arc(50, 55, 50, 50, HALF_PI);



}

// draw()
//
// Description of draw() goes here.
function draw() {



}
