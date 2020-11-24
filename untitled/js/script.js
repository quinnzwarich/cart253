"use strict";

/**************************************************
Template p5 project
Pippin Barr
Here is a description of this template p5 project.
**************************************************/

let font;
let qr;
let candyModel;
let array1;
let array2;
let candies = [];
let numCandies = 42;

function preload() {
  // is about 87.5 (75?) pixels below where it should be
  // it's dimensions are 115, 30, 60
  candyModel = loadModel(`assets/images/candy.OBJ`);
  qr = loadImage(`assets/images/frame.png`);
  font = loadFont(`assets/images/newfont.otf`);
}

function setup() {
  createCanvas(750, 750, WEBGL);
  //randomSeed(12);
  for (let i = 0; i < numCandies; i++) {
    let x = sin(i) * 10;
    //let y = random(-0.5, 0.5);
    let z = cos(i) * 10;
    let r = random(200, 255);
    let g = random(200, 255);
    let b = random(200, 255);
    let candy = new Candy(x, -height/tan(PI*30.0 / 180.0), width/3 + z, 0, 0.5, 0, i, candies, r, g, b);
    candies.push(candy);
  }

  textFont(font);
  textSize(120);
  textAlign(CENTER);
  array1 = font.textToPoints(`No Love Lost`, 0, -150, 120, {
    sampleFactor: 0.0541
  });
  array2 = font.textToPoints(`Film Fest`, 0, 0, 120, {
    sampleFactor: 0.0541
  });
}

function displayFont() {
  push();
  translate(-300, 0, -375);
  beginShape();
  for (let i = 0; i < array1.length; i++) {
    vertex(array1[i].x, array1[i].y);
  }
  endShape();
  pop();

  push();
  translate(-300, 0, -375);
  beginShape();
  for (let i = 0; i < array2.length; i++) {
    let candy = candies[floor(i/4)];
    vertex(array2[i].x, array2[i].y);
  }
  endShape();
  pop();
}

function draw() {
  background(255);
  orbitControl();
  drawRoom();
  displayFont();
  ambientLight(127);
  directionalLight(255, 255, 255, 0, 1200, -750);

  for (let i = 0; i < candies.length; i++) {
    let candy = candies[i];
    let gravity = createVector(0, 2, 0);
    candy.gravity(gravity);
    candy.move();
    candy.checkOverlapLeftWall();
    candy.checkOverlapRightWall();
    candy.checkOverlapBackWall();
    candy.checkOverlapFloor();
    candy.checkOverlapCandy();
    candy.display();
  }
}

function platform() {
  push();
  beginShape();
  vertex(-width/tan(PI*30.0 / 180.0) - width, height/2, width/2 + width);
  vertex(0, height/2, -width/tan(PI*30.0 / 180.0)) - width;
  vertex(width/tan(PI*30.0 / 180.0) + width, height/2, width/2 + width);
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
  vertex(-width/tan(PI*30.0 / 180.0) - width, height/2, width/2 + width);
  vertex(-width/tan(PI*30.0 / 180.0) - width, -height/tan(PI*30.0 / 180.0), width/2 + width);
  vertex(0, -height/tan(PI*30.0 / 180.0), -width/tan(PI*30.0 / 180.0)) - width;
  vertex(0, height/2, -width/tan(PI*30.0 / 180.0)) - width;
  endShape(CLOSE);
  pop();
}

function rightWall() {
  push();
  beginShape();
  vertex(width/tan(PI*30.0 / 180.0) + width, height/2, width/2 + width);
  vertex(width/tan(PI*30.0 / 180.0) + width, -height/tan(PI*30.0 / 180.0), width/2 + width);
  vertex(0, -height/tan(PI*30.0 / 180.0), -width/tan(PI*30.0 / 180.0)) - width;
  vertex(0, height/2, -width/tan(PI*30.0 / 180.0)) - width;
  endShape(CLOSE);
  pop();
}

function drawRoom() {
  platform();
  leftWall();
  rightWall();
  push();
  translate(-600, 0, 0);
  rotateY(PI/4);
  imageMode(CENTER);
  image(qr, 0, 0);
  pop();
  push();
  translate(600, 0, 0);
  rotateY(-PI/4);
  imageMode(CENTER);
  image(qr, 0, 0);
  pop();
}
