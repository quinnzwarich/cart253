"use strict";

/**************************************************
Template p5 project
Pippin Barr

Here is a description of this template p5 project.
**************************************************/

let oscillator;

function setup() {
  createCanvas(600, 600);
  userStartAudio();

  oscillator1 = new p5.Oscillator(220, `sine`);
}

function draw() {
  background(0);
  
  oscillator1.phase(0.55);
}

function mousePressed() {
  oscillator1.start();
}

function mouseReleased() {
  oscillator1.stop();
}
