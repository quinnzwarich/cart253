/**************************************************
exercise 01
Quinn Zwarich

The main idea is that the coordinates of the three circles are mapped to each other,
creating the illusion that the circles have multiplied. The speed at which they swell
is controlled via the mouse which itself affects the shade of the circles and the background.
Technically, it is monochromatic though purple tones can be made out through the interference patterns that occur.

P.S: there is lots of flashing ! I apologize and promise not to make such an obnoxious program in the future.

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
  x: 800,
  y: 1000,
  size: 200,
}

let circle2 = {
  x: 650,
  y: 1000,
  size: 200,
}

let circle3 = {
  x: 350,
  y: 1000,
  size: 200,
}

let speed = 1;
let multiplier = 1;


function setup() {
  createCanvas(1000, 1000);
}

// sin and cos are used to add cyclical movement that remains within the bounds of the canvas

function draw() {
background(bg.r, bg.g, bg.b);

circle.x = circle.x + sin(speed) * multiplier;
circle.size = circle.size + cos(speed);
circle2.y = circle.y + sin(speed) * multiplier;
circle2.size = circle2.size + cos(speed);
circle3.y = circle.y + sin(speed) * multiplier;
circle3.size = circle3.size + cos(speed);

 circle.x = map(circle2.x, 650, width, 800, 0);
 circle.y = map(circle2.y, 1000, 0, 1000, 0);

 circle2.x = map(circle3.x, 350, width, 650, 0);
 circle2.y = map(circle3.y, 1000, 0, 1000, 0);

 circle3.x = map(circle.x, 800, 0, 350, width);
 circle3.y = map(circle.y, 1000, 0, 1000, 0);

 // size controls both the shade of the background and of the circles but is inverted
 // the screen begins with a white background, undergoes a transition consisting of neutral grey tones,
 // then ends with a return to white negative space as the circles become larger than the background

 // the interference patterns go through many stages, as a result of this it sometimes ends with black

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
