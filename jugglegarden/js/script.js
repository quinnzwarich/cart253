"use strict";

/**************************************************
Template p5 project
Pippin Barr

Here is a description of this template p5 project.
**************************************************/

let gravityForce = 0.0025;
let clouds = [];
let bears = [];
let numBears = 10;
let dissipateLength = 60 * 2.5;

let state = `title`;


// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(windowWidth, windowHeight);

  for (let i = 0; i < numBears; i++) {
    let x = random(0, width);
    let y = random(-400, -100);
    let bear = new Bear(x, y);
    bears.push(bear);
  }
}

// draw()
//
// Description of draw() goes here.
function draw() {
  background(0, 127, 255);

  for (let i = 0; i < bears.length; i++) {
    let bear = bears[i];
    if (bear.active) {
      bear.gravity(gravityForce);
      for (let j = 0; j < clouds.length; j++) {
        let cloud = clouds[j];
        cloud.display(j);
        bear.bounce(clouds[j]);
      }
      bear.move();
      bear.display();
    }
  }
}

function dissipate() {
  clouds.shift();
}

function mousePressed() {
  let cloud = new Cloud(mouseX, mouseY);
  clouds.push(cloud);
  setTimeout(dissipate, 2000);
}
