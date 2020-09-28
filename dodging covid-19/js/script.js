/**************************************************
dodging covid-19
Quinn Zwarich

Here is a description of this template p5 project.
**************************************************/

let covid19 = {
  x: 0,
  y: 0,
  size: 100,
  vx: 0,
  vy: 0,
  speed: 2,
  fill: {
    r: 255,
    g: 255,
    b: 125
  }
}

let tentacles = {
  total: 8,
  spacing: 0,
  drawn: 0
}

let user = {
  x: 250,
  y: 250,
  size: 100,
  fill: 255
}

let angle = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);

  covid19.x = width / 2;
  covid19.y = height / 2;

}

// draw()
//
// Description of draw() goes here.
function draw() {
  background(0);

  // user movement
  noCursor();
  user.x = mouseX;
  user.y = mouseY;

  // covid19 movement
  covid19.x = covid19.x + covid19.vx;
  covid19.y = covid19.y + covid19.vy;

  if (covid19.x > width) {
    covid19.x = random(0, width/2);
  }

  if (covid19.x < 0) {
    covid19.x = random(width/2, width);
  }

  if (covid19.y > height) {
    covid19.y = random(0, height/2);
  }

  if (covid19.y < 0) {
    covid19.y = random(height/2, height);
  }

  let r = random();

  let xReact = map(user.x, 0, width, 0, 1);
  let yReact = map(user.y, 0, height, 0, 1);

  if (r < xReact) {
    covid19.vx = random(-3, 3);
  }
  else if (covid19.x < user.x) {
    covid19.vx = 3;
  }
  else if (covid19.x > user.x) {
    covid19.vx = -3;
  }

  if (r < yReact) {
    covid19.vy = random(-3, 3);
  }
  else if (covid19.y < user.y) {
    covid19.vy = 3;
  }
  else if (covid19.y > user.y) {
    covid19.vy = -3;
  }

  // check for covid19
  let d = dist(user.x, user.y, covid19.x, covid19.y);
  if (d < covid19.size/2 + user.size/2) {
    noLoop();
  }

    while (tentacles.drawn < tentacles.total) {

        let currentFill = map(tentacles.drawn, 0, tentacles.total, 0, 255);
        let x = map(tentacles.drawn, 0, tentacles.total, 0, width);
        let y = map(tentacles.drawn, 0, tentacles.total, 0, height);
        let x1 = map(tentacles.drawn, 0, tentacles.total, width, 0);
        let y1 = map(tentacles.drawn, 0, tentacles.total, height, 0);

        tightness = map(user.x, 0, width, -5, 5);

        push();
        curveTightness(tightness);
        stroke(currentFill);
        fill(currentFill, currentFill, currentFill/2, currentFill);
        curve(x, y, user.x, user.y, x1, y1, user.x * (tentacles.spacing*PI), user.y * (tentacles.spacing*PI));
        curve(x, y, user.x, user.y, x, y1, user.x * (tentacles.spacing*PI), user.y * (tentacles.spacing*PI));
        curve(x, y, user.x, user.y, x1, y, user.x * (tentacles.spacing*PI), user.y * (tentacles.spacing*PI));
        curve(x, y, user.x, user.y, x, y, user.x * (tentacles.spacing*PI), user.y * (tentacles.spacing*PI));
        pop();

        tentacles.drawn = tentacles.drawn + 1;

      }

  if (tentacles.drawn + 1) {

      tentacles.spacing = tentacles.spacing + 22.5;
      tentacles.spacing = tentacles.spacing / 180;

      }

  if (!(tentacles.drawn < tentacles.total)) {

      tentacles.drawn = 0;

      }

    // display user
    fill(user.fill);
    ellipse(covid19.x, covid19.y, covid19.size);

    // display covid19
    noStroke();
    fill(covid19.fill.r, covid19.fill.g, covid19.fill.b);
    ellipse(user.x, user.y, user.size);



}
