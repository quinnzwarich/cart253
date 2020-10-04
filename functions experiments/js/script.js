/**************************************************
Template p5 project
Pippin Barr

Here is a description of this template p5 project.
**************************************************/



// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(windowWidth, windowHeight);
}

// draw()
//
// Description of draw() goes here.
function draw() {
  background (0);

  parallels2(0, 0, 5, 1, 300, 50);
  parallels2(width, 0, -5, -1, 300, 50);
}

function parallels(x, y, space, numLines, lineWidth, lineHeight) {
  for(let i = 0; i < numLines; i++) {
    noStroke();
    fill(255);
    rectMode(CENTER);
    rect(x, y, lineWidth, lineHeight);
    space = space * 1.1225;
    x = x + space;
  }
}

function parallels2(x2, y2, space2, space2Mod, numLines2, lineHeight2) {
  for (let j = 0; j < numLines2; j++) {
    y2 = y2 + 5;
    space2 = space2 + space2Mod;
    lineHeight2 = lineHeight2 + 0.25;
    parallels(x2, y2, space2, 15, 2, lineHeight2);
  }
}
