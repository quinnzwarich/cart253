"use strict";

/**************************************************
Template p5 project
Pippin Barr

Here is a description of this template p5 project.
**************************************************/



let feistyBoo;
let shyBoo;

let boo1;

function preload() {
  feistyBoo = loadImage(`assets/images/boo.png`);
  shyBoo = loadImage(`assets/images/shyboo.png`);
}

function setup() {
  createCanvas(1200, 1200);
  boo1 = createBoo(600, 600);
}

function createBoo(x, y) {
  let boo = {
    x: x,
    y: y,
    vx: 0,
    vy: 0,
    speed: 5,
    tx: 0,
    ty: 10,
    size: 415,
    trail: [],
    trailSize: 5
  };
  return boo;
}

function moveBoo(boo) {
  boo.tx = boo.tx + 0.025;
  boo.ty = boo.ty + 0.025;

  let noiseX = noise(boo.tx);
  let noiseY = noise(boo.ty);

  boo.vx = map(noiseX, 0, 1, -boo.speed, boo.speed);
  boo.vy = map(noiseY, 0, 1, -boo.speed, boo.speed);

  boo.x = boo.x + boo.vx;
  boo.y = boo.y + boo.vy;

  let previousVX = boo.vx;
  let previousVY = boo.vy;
  let dx = boo.x - mouseX;
  let dy = boo.y - mouseY;

  
}

function displayBoo(boo) {
  let d = dist(mouseX, mouseY, boo.x, boo.y);
  let shade = map(d, width/2, 0, 0, 255);
  push();
  imageMode(CENTER);
  tint(shade);
  image(shyBoo, boo.x, boo.y);
  pop();
}

function draw() {
  background(0);

  moveBoo(boo1);
  displayBoo(boo1);
}
