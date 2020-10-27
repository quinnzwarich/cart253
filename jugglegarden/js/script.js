"use strict";

/**************************************************
Template p5 project
Pippin Barr

Here is a description of this template p5 project.
**************************************************/

let gravityForce = 0.0025;
let paddles = [];
let balls = [];
let numBalls = 3;
let columns = 3;
let rows = 3;

// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(windowWidth, windowHeight);

  for (let i = 0; i < numBalls; i++) {
    let x = random(0, width);
    let y = random(-400, -100);
    let ball = new Ball(x, y);
    balls.push(ball);
  }

  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      let scaleX = width / columns;
      let scaleY = height / rows;
      let pWidth = width / 3;
      let pHeight = height / 42;
      let angle = random(0, 2 * PI);
      let paddle = new Paddle(i * scaleX, j * scaleY, pWidth, pHeight, angle);
      paddles.push(paddle);
    }
  }
}

// draw()
//
// Description of draw() goes here.
function draw() {
  background(0);

  for (let i = 0; i < paddles.length; i++) {
    let paddle = paddles[i];
    paddle.display();
    paddle.move();
  }

  for (let i = 0; i < balls.length; i++) {
    let ball = balls[i];
    if (ball.active) {
      ball.gravity(gravityForce);
      ball.move();
      ball.bounce(paddles);
      ball.display();
    }
  }
}
