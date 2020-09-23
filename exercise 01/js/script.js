/**************************************************
exercise 01
Quinn Zwarich

The program has changed since a bit since it's first inception. There are now 3 circles that dialate and sort of rebound
when they become too small. My intention in designing was to have as much feedback between parameters as possible
(without everything blowing up). The cursor's role revolves around this, it controls the speed and rate at which feedback occurs.

**************************************************/

let bg = {
  r: 0,
  g: 0,
  b: 0
}

let colour = {
  r: 255,
  g:127,
  b: 255
}

let circle = {
  x: 633,
  y: 1000,
  size: 200,
}

let circle2 = {
  x: 483,
  y: 1000,
  size: 200,
}

let circle3 = {
  x: 333,
  y: 1000,
  size: 200,
}

let multiplier = 5;

let speed = 5;


function setup() {
  createCanvas(1000, 1000);
}

// sin and cos are basically just here to make things spicy

function draw() {
background(bg.r, bg.g, bg.b);

circle.x = circle.x + sin(speed) * multiplier;
circle.size = circle.size + cos(speed) * (circle2.x / 50);
circle2.y = circle.y + sin(speed) * multiplier;
circle2.size = circle2.size + cos(speed) * (circle3.x / 50);
circle3.y = circle.y + sin(speed) * multiplier;
circle3.size = circle3.size + cos(speed) * (circle.x / 50);

circle.x = map(circle2.x, 250, width, 400, 0);
circle.y = map(circle2.y, 100, height, 400, 0);

circle2.x = map(circle3.x, 400, 0, 100, width);
circle2.y = map(circle3.y, 400, 0, 400, height);

circle3.x = map(circle.x, 100, width, 250, 0);
circle3.y = map(circle.y, 400, 0, 100, height);

// background colour and the colour of circles receive inverted modulation for contrast

multiplier = map(mouseX, 0, width, 1, 500);
speed = map(mouseY, 0, height, 1, 15);
colour.r = map(circle.size, 200, 1000, 0, 255);
bg.r = map(circle.size, 200, 1000, 255, 0);
colour.b = map(circle2.y, 1000, 0, 0, 255);
bg.b = map(circle3.y, 1000, 0, 255, 0);

  fill(colour.r, colour.g, colour.b);

  noStroke();

  ellipse(circle.x, circle.y, circle.size);

  ellipse(circle2.x, circle2.y, circle2.size);

  ellipse(circle3.x, circle3.y, circle3.size);

}
