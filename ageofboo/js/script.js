"use strict";

/**************************************************
Template p5 project
Pippin Barr

Here is a description of this template p5 project.
**************************************************/

let user = {
  x: 0,
  y: 0,
  prevX: 0
};

let spookyMusic
let booLaugh;
let shyBoo;
let feistyBoo;
let marioFont;

let booWho = [];

let state = `title`;

function preload() {
  marioFont = loadFont(`assets/fonts/SuperMario256.ttf`)
  feistyBoo = loadImage(`assets/images/boo.png`);
  shyBoo = loadImage(`assets/images/shyboo.png`);
  booLaugh = loadSound(`assets/sounds/editedboolaugh.mp3`);
  spookyMusic = loadSound(`assets/sounds/ghosthouse.mp3`);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < 5; i++) {
    booWho[i] = createBoo(random(width/4, 3 * width/4), random(height/4, 3 * height/4), random(0, 10), random (0,10), random(0, 0.1));
  }
}

function createBoo(x, y, tx, ty, increment) {
  let boo = {
    x: x,
    y: y,
    vx: 0,
    vy: 0,
    speed: 8,
    tx: tx,
    ty: ty,
    increment: increment,
    size: 415,
    trail: [],
    trailSize: 5
  };
  return boo;
}

function moveBooAndCheckOffscreen(boo) {
  boo.tx = boo.tx + boo.increment;
  boo.ty = boo.ty + boo.increment;

  let noiseX = noise(boo.tx);
  let noiseY = noise(boo.ty);

  let dx = boo.x - mouseX;
  let dy = boo.y - mouseY;
  let d2 = dist(mouseX, mouseY, boo.x, boo.y);

  if (d2 < boo.size) {
    if (!booLaugh.isPlaying()) {
      booLaugh.play();
    }
    if (dx < 0) {
      boo.vx = -boo.speed;
    }
    else if (dx > 0) {
      boo.vx = boo.speed;
    }

    if (dy < 0) {
      boo.vy = -boo.speed;
    }
    else if (dy > 0) {
      boo.vy = boo.speed;
    }
    if (boo.x < 0 || boo.x > width || boo.y < 0 || boo.y > height) {
      state = `youMadeBooFloatAway`;
      spookyMusic.setVolume(0);
    }
  }
  else {
    boo.vx = map(noiseX, 0, 1, -boo.speed, boo.speed);
    boo.vy = map(noiseY, 0, 1, -boo.speed, boo.speed);

    if (boo.x < 0 || boo.x > width || boo.y < 0 || boo.y > height) {
      state = `booFloatedAway`;
      spookyMusic.setVolume(0);
    }
  }

  boo.x = boo.x + boo.vx;
  boo.y = boo.y + boo.vy;
}

function displayBoo(boo) {
  let d2 = dist(mouseX, mouseY, boo.x, boo.y);
  let shade = map(d2, 2*width/3, 0, 0, 255);
  push();
  imageMode(CENTER);
  tint(shade, shade);
  image(shyBoo, boo.x, boo.y);
  pop();
}

function moveAndDisplayUser() {
  noCursor();

  user.x = mouseX;
  user.y = mouseY;

  push();
  imageMode(CENTER);
  image(feistyBoo, user.x, user.y, 415, 415);
  pop();
}

function title() {
  push();
  textFont(marioFont);
  textSize(32);
  textAlign(CENTER, CENTER);
  fill(255);
  text(`boos float away easy,
  don't let em get lost!`, width/2, height/2);
  pop();
}

function keepEmTogether() {
  moveAndDisplayUser();

  for (let i = 0; i < 5; i++) {
    moveBooAndCheckOffscreen(booWho[i]);
  }
  for (let i = 0; i < 5; i++) {
    displayBoo(booWho[i]);
  }
}

function booFloatedAway() {
  push();
  textFont(marioFont);
  textSize(32);
  textAlign(CENTER, CENTER);
  fill(255);
  text(`a boo floated away,
  don't let em get lost next time!`, width/2, height/2);
  pop();
}

function youMadeBooFloatAway() {
  push();
  textFont(marioFont);
  textSize(32);
  textAlign(CENTER, CENTER);
  fill(255);
  text(`you made a boo float away,
  why would you go and do such a thing?!?`, width/2, height/2);
  pop();
}

function draw() {
  background(0);

  if (state === `title`) {
    title();
  }
  else if (state === `keepEmTogether`) {
    keepEmTogether();
  }
  else if (state === `booFloatedAway`) {
    booFloatedAway();
  }
  else if (state === `youMadeBooFloatAway`) {
    youMadeBooFloatAway();
  }
}

function mousePressed() {
  if (state === `title`) {
    state = `keepEmTogether`;
  }
  if (!spookyMusic.isPlaying()) {
    spookyMusic.loop();
  }
}
