/**************************************************
dodging covid-19
Quinn Zwarich

Here is a description of this template p5 project.
**************************************************/

let moth = {
  x: 0,
  y: 0,
  size: 100,
  vx: 0,
  vy: 0,
}

let tentacles = {
  total: 8,
  spacing: 0,
  drawn: 0,
}

let firefly = {
  x: 250,
  y: 250,
  size: 100,
  fill: {
    r: 255,
    g: 255,
    b: 125
  }
}

let user = {
  x: 0,
  y: 0,
}

let mth;

function preload() {
  mth = loadImage('assets/moth.jpg');
}



function setup() {
  createCanvas(windowWidth, windowHeight);

mth.loadPixels();

  moth.x = width/2;
  moth.y = height;

  firefly.x = width/2;
  firefly.y = height/3;

}

// draw()
//
// Description of draw() goes here.
function draw() {
  background(0);

  // firefly movement
  noCursor();

if (mouseIsPressed) {
  user.x = mouseX;
  user.y = mouseY;
}

  // moth movement
  moth.x = moth.x + moth.vx;
  moth.y = moth.y + moth.vy;

if (mouseIsPressed) {
  moth.x = user.x;
  moth.y = user.y;
}

  let r1 = random();

  let xReact = map(firefly.x, 0, width, 0, 1);
  let yReact = map(firefly.y, 0, height, 0, 1);

  if (r1 < xReact) {
    moth.vx = random(-1, 1);
  }
  else if (moth.x < firefly.x) {
    moth.vx = 1;
  }
  else if (moth.x > firefly.x) {
    moth.vx = -1;
  }

  if (r1 < yReact) {
    moth.vy = random(-1, 1);
  }
  else if (moth.y < firefly.y) {
    moth.vy = 1;
  }
  else if (moth.y > firefly.y) {
    moth.vy = -1;
  }

  // check for moth
  let d = dist(firefly.x, firefly.y, moth.x, moth.y);
  if (d < moth.size/2 + firefly.size/2) {
    noLoop();
  }

    while (tentacles.drawn < tentacles.total) {

        let currentFill = map(tentacles.drawn, 0, tentacles.total, 0, 255);
        let x = map(tentacles.drawn, 0, tentacles.total, 0, width);
        let y = map(tentacles.drawn, 0, tentacles.total, 0, height);
        let x1 = map(tentacles.drawn, 0, tentacles.total, width, 0);
        let y1 = map(tentacles.drawn, 0, tentacles.total, height, 0);

        tightness = map(firefly.x, 0, width, -5, 5);

        if (user.x > x) {
           firefly.vx = 15;
         }
         else if (user.x < x) {
           firefly.vx = -15;
         }
           if (user.x < x1) {
              firefly.vx = 15;
            }
            else if (user.x > x) {
              firefly.vx = -15;
            }
              if (user.y > y) {
                 firefly.vy = 15;
               }
               else if (user.y < y) {
                 firefly.vy = -15;
               }
                 if (user.y < y1) {
                    firefly.vy = 15;
                  }
                  else if (user.x > y1) {
                    firefly.vy = -15;
                  }

        push();
        curveTightness(tightness);
        stroke(currentFill);
        fill(currentFill, currentFill, currentFill/2, currentFill);
        curve(x, y, firefly.x, firefly.y, x1 + firefly.vx, y1 + firefly.vy, firefly.x * (tentacles.spacing*PI), firefly.y * (tentacles.spacing*PI));
        curve(x, y, firefly.x, firefly.y, x + firefly.vx, y1 + firefly.vy, firefly.x * (tentacles.spacing*PI), firefly.y * (tentacles.spacing*PI));
        curve(x, y, firefly.x, firefly.y, x1 + firefly.vx, y + firefly.vy, firefly.x * (tentacles.spacing*PI), firefly.y * (tentacles.spacing*PI));
        curve(x, y, firefly.x, firefly.y, x + firefly.vx, y + firefly.vy, firefly.x * (tentacles.spacing*PI), firefly.y * (tentacles.spacing*PI));
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

    // display moth
    image(mth, moth.x, moth.y, moth.size, moth.size);

    // display firefly
    noStroke();
    fill(firefly.fill.r, firefly.fill.g, firefly.fill.b);
    ellipse(firefly.x, firefly.y, firefly.size);



}
