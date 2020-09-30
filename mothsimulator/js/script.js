/**************************************************
mothsimulator
Quinn Zwarich

The simulation depicts a moth wandering towards a firefly, if it touches the firefly it gets zapped and the simulation ends.
**************************************************/

let moth = {
  x: 0,
  y: 0,
  size: 100,
  vx: 0,
  vy: 0,
};

let wings = {
  total: 8,
  spacing: 0,
  drawn: 0,
};

let firefly = {
  x: 250,
  y: 250,
  size: 100,
  fill: {
    r: 255,
    g: 255,
    b: 125,
  },
};

let user = {
  x: 0,
  y: 0,
  size: 100,
};

let mth;

function preload() {
  mth = loadImage("assets/images/moth.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  moth.x = width / 2;
  moth.y = height;

  firefly.x = width / 2;
  firefly.y = height / 3;
}

function draw() {
  background(0);

  // user interaction
  // allows moth to be dragged away from the firefly
  // affects the positions of the firefly wings
  if (mouseIsPressed) {
    user.x = mouseX;
    user.y = mouseY;
  }

  let d = dist(user.x, user.y, moth.x, moth.y);

  if (mouseIsPressed && d < user.size / 2 + moth.size / 2) {
    moth.x = user.x;
    moth.y = user.y;
  }

  // moth movement
  // the idea is that the farther the moth is from the firefly, the less likely it is to be interested
  // this was more effective in a previous iteration in which the user controlled the firefly
  // the use of random still makes for very moth like movement
  moth.x = moth.x + moth.vx;
  moth.y = moth.y + moth.vy;

  let r1 = random();

  let xReact = map(firefly.x, 0, width, 0, 1);
  let yReact = map(firefly.y, 0, height, 0, 1);

  if (r1 < xReact) {
    moth.vx = random(-1, 1);
  } else if (moth.x < firefly.x) {
    moth.vx = 1;
  } else if (moth.x > firefly.x) {
    moth.vx = -1;
  }

  if (r1 < yReact) {
    moth.vy = random(-1, 1);
  } else if (moth.y < firefly.y) {
    moth.vy = 1;
  } else if (moth.y > firefly.y) {
    moth.vy = -1;
  }

  // check for moth
  let d1 = dist(firefly.x, firefly.y, moth.x, moth.y);
  if (d1 < moth.size / 2 + firefly.size / 2) {
    noLoop();
  }

  // draw the firefly wings
  // a whole lot is going on here, I can't say I completely understand what I did
  // the idea here is that the number of of wings is gradation and curvature of each controlled
  // as well, i attempted to draw each one PI/8 radians apart relative to each set
  // there are four sets, each being reflected across a different axis
  // (pay special attention to the 5th and 6th arguments of each curve drawing to see this)
  while (wings.drawn < wings.total) {
    let currentFill = map(wings.drawn, 0, wings.total, 0, 255);
    let x = map(wings.drawn, 0, wings.total, 0, width);
    let y = map(wings.drawn, 0, wings.total, 0, height);
    let x1 = map(wings.drawn, 0, wings.total, width, 0);
    let y1 = map(wings.drawn, 0, wings.total, height, 0);

    tightness = map(firefly.x, 0, width, -5, 5);

    // animation of the wings
    if (user.x > x) {
      firefly.vx = 15;
    } else if (user.x < x) {
      firefly.vx = -15;
    }
    if (user.x < x1) {
      firefly.vx = 15;
    } else if (user.x > x) {
      firefly.vx = -15;
    }
    if (user.y > y) {
      firefly.vy = 15;
    } else if (user.y < y) {
      firefly.vy = -15;
    }
    if (user.y < y1) {
      firefly.vy = 15;
    } else if (user.x > y1) {
      firefly.vy = -15;
    }

    push();
    curveTightness(tightness);
    stroke(currentFill);
    fill(currentFill, currentFill, currentFill / 2, currentFill);
    curve(
      x,
      y,
      firefly.x,
      firefly.y,
      x1 + firefly.vx,
      y1 + firefly.vy,
      firefly.x * (wings.spacing * PI),
      firefly.y * (wings.spacing * PI)
    );
    curve(
      x,
      y,
      firefly.x,
      firefly.y,
      x + firefly.vx,
      y1 + firefly.vy,
      firefly.x * (wings.spacing * PI),
      firefly.y * (wings.spacing * PI)
    );
    curve(
      x,
      y,
      firefly.x,
      firefly.y,
      x1 + firefly.vx,
      y + firefly.vy,
      firefly.x * (wings.spacing * PI),
      firefly.y * (wings.spacing * PI)
    );
    curve(
      x,
      y,
      firefly.x,
      firefly.y,
      x + firefly.vx,
      y + firefly.vy,
      firefly.x * (wings.spacing * PI),
      firefly.y * (wings.spacing * PI)
    );
    pop();

    wings.drawn = wings.drawn + 1;
  }

  if (wings.drawn + 1) {
    wings.spacing = wings.spacing + 22.5;
    wings.spacing = wings.spacing / 180;
  }

  if (!(wings.drawn < wings.total)) {
    wings.drawn = 0;
  }

  // display moth
  push();
  imageMode(CENTER);
  image(mth, moth.x, moth.y, moth.size, moth.size);
  pop();

  // display firefly
  noStroke();
  fill(firefly.fill.r, firefly.fill.g, firefly.fill.b);
  ellipse(firefly.x, firefly.y, firefly.size);
}
