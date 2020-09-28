/**************************************************
dodging covid-19
Quinn Zwarich

Here is a description of this template p5 project.
**************************************************/

let covid19 = {
  x: 0,
  y: 0,
  size: 150,
  vx: 0,
  vy: 0,
  speed: 5,
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

  // covid19 movement
  //covid19.x = covid19.x + covid19.vx;
  //covid19.y = covid19.y + covid19.vy;

  //if (user.x > width/2) {
  //  if (covid19.x > width || covid19.x < 0) {
  //    covid19.x = width;
  //    covid19.vx = covid19.vx + 1;
  //    covid19.vx = -(covid19.vx);
  //    covid19.y = user.y;
  //  }
  //}

  //if (user.x < width/2) {
  //  if (covid19.x > width || covid19.x < 0) {
  //    covid19.x = 0;
  //    covid19.vx = covid19.vx + 1;
  //    covid19.vx = -(covid19.vx);
  //    covid19.y = user.y;
  //  }
  //}



  // user movement
  noCursor();
  user.x = mouseX;
  user.y = mouseY;

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

        tightness = map(covid19.x, 0, width, -5, 5);

        push();
        curveTightness(tightness);
        stroke(currentFill);
        fill(currentFill, currentFill, currentFill/2, currentFill);
        curve(x, y, covid19.x, covid19.y, x1, y1, covid19.x * (tentacles.spacing*PI), covid19.y * (tentacles.spacing*PI));
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
    ellipse(user.x, user.y, user.size);

angle = angle + 0.2;

      fill(covid19.fill.r, covid19.fill.g, covid19.fill.b);
      translate(width/2, height/2);
      rotate(2*PI);
      noStroke();
      ellipse(covid19.x, covid19.y, covid19.size);



}
