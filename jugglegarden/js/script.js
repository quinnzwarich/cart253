"use strict";

/**************************************************
Dancing Bears
Quinn Zearich

This one is a little hurtin. I wish I could have done more with it
but it is currently 5 in the morning. Anywho, the game is based around
around placing clouds underneath bear lookin things to keeo them afloat.
Not much more too it than that. Among other features I really wanted the bears
to have googly eyes but I just didn't have enough time. I hope this will suffice!
**************************************************/

let gravityForce = 0.0005;
let clouds = [];
let bears = [];
let numBears = 5;
let dissipateLength = 60 * 2.5;
let gameOverTimer = 0;
let gameLength = 60 * 30;

let state = `title`;

function setup() {
  createCanvas(windowWidth, windowHeight);

  for (let i = 0; i < numBears; i++) {
    let x = random(0, width);
    let y = random(-400, -100);
    let bear = new Bear(x, y);
    bears.push(bear);
  }
}

function draw() {
  background(0, 127, 255);

  if (state === `title`) {
    title();
  } else if (state === `game`) {
    game();
  } else if (state === `droppedOne`) {
    droppedOne();
  } else if (state === `gotEm`) {
    gotEm();
  }
}

function title() {
  push();
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(32);
  text(`can you keep the bears afloat for 30 seconds?`, width / 2, height / 2);
  pop();
}

function game() {
  clock();

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
    if (!bear.active) {
      state = "droppedOne";
    }
  }
}

function gotEm() {
  push();
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(32);
  text(`you did them well, proud of you!`, width / 2, height / 2);
  pop();
}

function droppedOne() {
  push();
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(32);
  text(
    `you might not have kept them in the air...\nbut you kept them near to your heart...`,
    width / 2,
    height / 2
  );
  pop();
}

// have the game last for 30 seconds if a bear isn't dropped
function clock() {
  gameOverTimer++;
  if (gameOverTimer >= gameLength && !(state === `droppedOne`)) {
    state = `gotEm`;
  }
}

// remove clouds from the array after a couple seconds
function dissipate() {
  clouds.shift();
}

function mousePressed() {
  if (state === `title`) {
    state = `game`;
  }
  let cloud = new Cloud(mouseX, mouseY);
  clouds.push(cloud);
  setTimeout(dissipate, 2000);
}
