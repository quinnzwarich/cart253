/**************************************************
Template p5 project
Pippin Barr

Here is a description of this template p5 project.
**************************************************/

let circle1 = {
  x: 0,
  y: 0,
  size: 100,
  vx: 0,
  vy: 0,
  speed: 3
}

let circle2 = {
  x: 0,
  y: 0,
  size: 100,
  vx: 0,
  vy: 0,
  speed: 4
}

let angle = 0;
let fallingOutRate = 50;
let bgShade = 0;

let state = `title`; // can be: title, simulation, love, or sadness

// setup()
function setup() {
  createCanvas(windowWidth, windowHeight);

  // position circles separated from one another
  circle1.x = width / 3;
  circle1.y = height / 2;
  circle2.x = 2 * width / 3;
  circle2.y = height / 2;
}

// draw()
function draw() {
  background(0);

  if (state === `title`) {
    title();
  }
  else if (state === `simulation`) {
    simulation();
  }
  else if (state === `neverMetEnding`) {
    neverMetEnding();
  }
  else if (state === `turnAwayEnding`) {
    turnAwayEnding();
  }
  else if (state === `love`) {
    love();
  }
  else if (state === `loveEnding`) {
    loveEnding();
  }
}

function title() {
  background(255);

  push();
  textSize(64);
  fill(0);
  textAlign(CENTER, CENTER);
  text(`love actually`, width/2, height/3);
  pop();
}

function simulation() {
  move();
  checkOffScreen1();
  checkOffScreen2();
  checkOverlap();
  display();
}

function love() {
  // rotate the circles around each other to symbolize LOVE
  checkFallingOutRate();

  background(bgShade)

  push();
  noStroke();
  textSize(32);
  fill(255);
  textAlign(CENTER, CENTER);
  text(`is it any more clear now that we've met?`, width/2, 2 * height/3);
  pop();

  push();
  noStroke();
  textSize(32);
  fill(bgShade * 1.0312);
  textAlign(CENTER, CENTER);
  text(`is it any more clear now that you've left?`, width/2, 4 * height/5);
  pop();

  ellipseMode(CENTER);
  angleMode(DEGREES);
  translate(circle1.x, circle1.y);
  rotate(angle);
  noStroke();
  ellipse(-fallingOutRate, 0, circle1.size);
  ellipse(fallingOutRate, 0, circle2.size);

  angle = angle + 0.5;
  fallingOutRate = fallingOutRate + 0.25;
  bgShade = map(fallingOutRate, 50, 1000, 0, 255);
}

function neverMetEnding() {
  push();
  textSize(32);
  fill(255);
  textAlign(CENTER, CENTER);
  text(`and maybe you never will...`, width/2, 2 * height/3);
  pop();
}

function turnAwayEnding() {
  push();
  textSize(32);
  fill(255);
  textAlign(CENTER, CENTER);
  text(`I know I never will...`, width/2, 2 * height/3);
  pop();
}

function loveEnding() {
  background(255);
}

function move() {

  // allow user to control circle with arrow keys
  if (keyIsDown(LEFT_ARROW)) {
    circle1.vx = -circle1.speed;
  }
  else if (keyIsDown(RIGHT_ARROW)) {
    circle1.vx = circle1.speed;
  }
  else {
    circle1.vx = 0;
  }

  if (keyIsDown(UP_ARROW)) {
    circle1.vy = -circle1.speed;
  }
  else if (keyIsDown(DOWN_ARROW)) {
    circle1.vy = circle1.speed;
  }
  else {
    circle1.vy = 0;
  }

  // make non user controlled circle randomly search
  let change = random();
  if (change < 0.05) {
    circle2.vx = random(-circle2.speed, circle2.speed);
    circle2.vy = random(-circle2.speed, circle2.speed);
  }

  circle1.x = circle1.x + circle1.vx;
  circle1.y = circle1.y + circle1.vy;

  circle2.x = circle2.x + circle2.vx;
  circle2.y = circle2.y + circle2.vy;
}

function checkOffScreen1() {
  // check if the circles have gone offscreen
  if (circle2.x < 0 || circle2.x > width || circle2.y < 0 || circle2.y > height) {
      state = `neverMetEnding`;
    }
  }

function checkOffScreen2() {
  // check if the circles have gone offscreen
  if (circle1.x < 0 || circle1.x > width || circle1.y < 0 || circle1.y > height) {
      state = `turnAwayEnding`;
    }
  }

function checkOverlap() {
  // check if the circles overlap
  let d = dist(circle1.x, circle1.y, circle2.x, circle2.y);
  if (d < circle1.size/2 + circle2.size/2) {
    state = `love`;
  }
}

function checkFallingOutRate() {
  if (fallingOutRate > 1000) {
    state = 'loveEnding';
  }
}

function display() {
  push();
  background(0);
  pop();

  push();
  ellipse(circle1.x, circle1.y, circle1.size);
  ellipse(circle2.x, circle2.y, circle2.size);
  pop();
  push();
  textSize(32);
  fill(255);
  textAlign(CENTER, CENTER);
  text(`you never knew what it was you were looking for`, width/2, 2 * height/3);
  pop();
}

function mousePressed() {
  if (state === `title`) {
    state = `simulation`;
  }
}
