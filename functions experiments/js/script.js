
let bg = 0;

function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(bg);

  if (keyIsDown(65)) {
    rectMode(CENTER);
    rect(250, 250, 100, 100);
  }
}
