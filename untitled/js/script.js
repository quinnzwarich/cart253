"use strict";

/**************************************************
Template p5 project
Pippin Barr

Here is a description of this template p5 project.
**************************************************/

let qr;
let candyModel;
let candies = [];
let numCandies = 10;

function preload() {
  // is about 87.5 (75?) pixels below where it should be
  // it's dimensions are 115, 30, 60
  candyModel = loadModel(`assets/images/candy.OBJ`);
  qr = loadImage(`assets/images/frame.png`);
}

function setup() {
  createCanvas(750, 750, WEBGL);
  //randomSeed(12);
  for (let i = 0; i < numCandies; i++) {
    let x = random(-0.5, 0.5);
    let y = random(-0.5, 0.5);
    let z = random(-0.5, 0.5);
    let r = random(200, 255);
    let g = random(200, 255);
    let b = random(200, 255);
    let candy = new Candy(x, -height/tan(PI*30.0 / 180.0) + y, -width + z, 0, 0.5, 0, i, candies, r, g, b);
    candies.push(candy);
  }
}

function draw() {
  background(255);
  orbitControl();
  drawRoom();
  ambientLight(127);
  directionalLight(255, 255, 255, 0, 1200, -750);

  for (let i = 0; i < candies.length; i++) {
    let candy = candies[i];
    let gravity = createVector(0, 2, 0);
    candy.gravity(gravity);
    candy.move();
    candy.checkOverlapLeftWall();
    candy.checkOverlapRightWall();
    candy.checkOverlapFloor();
    candy.checkOverlapCandy();
    candy.display();
  }
}

function platform() {
  push();
  beginShape();
  vertex(-width/tan(PI*30.0 / 180.0), height/2, width/2);
  vertex(0, height/2, -width/tan(PI*30.0 / 180.0));
  vertex(width/tan(PI*30.0 / 180.0), height/2, width/2);
  endShape(CLOSE);
  pop();
}

// function roof() {
//   push();
//   beginShape();
//   vertex(-width/tan(PI*30.0 / 180.0), -height/tan(PI*30.0 / 180.0), width/2);
//   vertex(0, -height/tan(PI*30.0 / 180.0), -width/tan(PI*30.0 / 180.0));
//   vertex(width/tan(PI*30.0 / 180.0), -height/tan(PI*30.0 / 180.0), width/2);
//   endShape(CLOSE);
//   pop();
// }

function leftWall() {
  push();
  beginShape();
  vertex(-width/tan(PI*30.0 / 180.0), height/2, width/2);
  vertex(-width/tan(PI*30.0 / 180.0), -height/tan(PI*30.0 / 180.0), width/2);
  vertex(0, -height/tan(PI*30.0 / 180.0), -width/tan(PI*30.0 / 180.0));
  vertex(0, height/2, -width/tan(PI*30.0 / 180.0));
  endShape(CLOSE);
  pop();
}

function rightWall() {
  push();
  beginShape();
  vertex(width/tan(PI*30.0 / 180.0), height/2, width/2);
  vertex(width/tan(PI*30.0 / 180.0), -height/tan(PI*30.0 / 180.0), width/2);
  vertex(0, -height/tan(PI*30.0 / 180.0), -width/tan(PI*30.0 / 180.0));
  vertex(0, height/2, -width/tan(PI*30.0 / 180.0));
  endShape(CLOSE);
  pop();
}

function drawRoom() {
  platform();
  leftWall();
  rightWall();
  push();
  translate(0, height/2 - 1, 0);
  rotateX(PI/2);
  imageMode(CENTER);
  image(qr, 0, 0);
  pop();
}
