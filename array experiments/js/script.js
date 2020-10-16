"use strict";

/**************************************************
Template p5 project
Pippin Barr

Here is a description of this template p5 project.
**************************************************/

let circle = {
  x: 0,
  y: 0,
  size: 100,
  trail: [],
  trailSize: 25.5
};

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
  background(0);

  circle.x = mouseX;
  circle.y = mouseY;

  for (let i = 0; i < circle.trail.length; i++) {
    let position = circle.trail[i];
    let shade = map(i, 0, circle.trail.length, 0, 255);
    noStroke();
    fill(255, 255, 255, shade);
    ellipse(position.x, position.y, circle.size);
  }

  push();
  ellipse(circle.x, circle.y, circle.size);
  pop();


  let newTrailPosition = {
    x: circle.x,
    y: circle.y
  };
  circle.trail.push(newTrailPosition);

  if (circle.trail.length > circle.trailSize) {
    circle.trail.shift();
  }
}
