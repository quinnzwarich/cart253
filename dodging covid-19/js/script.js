/**************************************************
dodging covid-19
Quinn Zwarich

Here is a description of this template p5 project.
**************************************************/

let covid19 = {
  x: 0,
  y: 250,
  size: 100,
  size2: 500,
  vx: 0,
  vy: 0,
  speed: 5,
  fill: {
    r: 0,
    g: 0,
    b: 0
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

let static = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);

  covid19.y = random(0, height);
  covid19.vx = covid19.speed;
}

// draw()
//
// Description of draw() goes here.
function draw() {
  background(0);

  // covid19 movement
  covid19.x = covid19.x + covid19.vx;
  covid19.y = covid19.y + covid19.vy;

  if (covid19.x > width) {
    covid19.x = 0;
    covid19.y = user.y;
  }

  // user movement
  noCursor();
  user.x = mouseX;
  user.y = mouseY;

  // check for covid19
  let d = dist(user.x, user.y, covid19.x, covid19.y);
  if (d < covid19.size/2 + user.size/2) {
    noLoop();
  }

  // display static
    static = map(d, 0, width, 100, 0);

    for (let i = 0; i < static; i++) {

      let x = random(0, i);
      let y = random(0, i);
      let x1 = random(0, i);
      let y1 = random(0, i);

      while (tentacles.drawn < tentacles.total) {

        tentacles.spacing = tentacles.spacing + 22.5;
        tentacles.spacing = tentacles.spacing / 180;

        curve(x, y, covid19.x, covid19.y, covid19.x * (tentacles.spacing*PI), covid19.y * (tentacles.spacing*PI), x1, y1);

        tentacles.drawn = tentacles.drawn + 1

      }
    }

    if (!(tentacles.drawn < tentacles.total)) {
      tenctacles.drawn = 0;
    }

  // display covid19
  //fill(covid19.fill.r, covid19.fill.g, covid19.fill.b);
  //ellipse(covid19.x, covid19.y, covid19.size);

  // display user
  fill(user.fill);
  ellipse(user.x, user.y, user.size);
}
