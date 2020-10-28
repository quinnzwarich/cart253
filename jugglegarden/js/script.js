"use strict";

/**************************************************
Template p5 project
Pippin Barr

Here is a description of this template p5 project.
**************************************************/

let gravityForce = 0.0025;
let clouds = [];
let balls = [];
let numBalls = 3;

// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(windowWidth, windowHeight);

  for (let i = 0; i < numBalls; i++) {
    let x = random(0, width);
    let y = random(200, -100);
    let ball = new Ball(x, y);
    balls.push(ball);
  }
}

// draw()
//
// Description of draw() goes here.
function draw() {
  background(0);

  for (let i = 0; i < clouds.length; i++) {
    let cloud = clouds[i];
    cloud.display(i);
  }

  for (let i = 0; i < balls.length; i++) {
    let ball = balls[i];
    if (ball.active) {
      // ball.gravity(gravityForce);
      // ball.move();
      ball.display();
    }
  }
}

function mousePressed() {
  let cloud = new Cloud(mouseX, mouseY);
  clouds.push(cloud);
}
