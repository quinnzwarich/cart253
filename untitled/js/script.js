"use strict";

/**************************************************
Template p5 project
Pippin Barr

Here is a description of this template p5 project.
**************************************************/

let qr;
let candyModel;
let candies = [];
let map;
let rowProbability = [0.4, 0.6, 0.75, 0.9, 1];
let numbers = [1, 1, 1, 1, 1,
               1, 1, 1, 1, 1,
               1, 1, 1, 1, 1];
let rows = 5;
let columns = 9;
let numCandies = 31;
let offset = 40;

function preload() {
  candyModel = loadModel(`assets/images/candy.OBJ`);
  qr = loadImage(`assets/images/frame.png`);
}

function setup() {
  createCanvas(750, 750, WEBGL);
  let k = 0;

  let newLength = numCandies - (numbers.length + 1)
  while (newLength > 0) {
    let position = floor(random(0, numbers.length));
    numbers[position]++;
    newLength--;
  }
  numbers.sort();
  numbers.reverse();
  console.log(numbers);

  map = [
    [0, 0, 0, 0, numbers[0], 0, 0, 0, 0],
    [0, 0, 0, numbers[1], 0, numbers[2], 0, 0 ,0],
    [0, 0, numbers[3], 0, numbers[4], 0, numbers[5], 0 ,0],
    [0, numbers[6], 0, numbers[7], 0, numbers[8], 0, numbers[9] ,0],
    [numbers[10], 0, numbers[11], 0, numbers[12], 0, numbers[13], 0, numbers[14]]
  ];

    for (let i = 0; i < map.length; i++) {
      let rows = map[i];
      for (let j = 0; j < rows.length; j++) {
        let tile = rows[j];
        if (!(tile === 0)) {
        for (let iterate = 0; iterate < tile; iterate++) {
          let r = random(200, 255); let g = random(200, 255); let b = random(200, 255);
          let candy = new Candy(-460 + (j * 115), -height/tan(PI*30.0 / 180.0), -1100 + (i * 120), 0, 0.5, 0, iterate, candies, r, g, b);
          candies.push(candy);
          console.log(tile);
        }
      }
    }
  }
}

function draw() {
  background(255);
  drawRoom();
  orbitControl();
  ambientLight(127);
  directionalLight(255, 255, 255, 0, 1, -1);

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
  translate(0, height/2 - 1, -150);
  rotateX(PI/2);
  imageMode(CENTER);
  image(qr, 0, 0);
  pop();
}
