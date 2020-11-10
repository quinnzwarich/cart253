"use strict";

/**************************************************
Template p5 project
Pippin Barr

Here is a description of this template p5 project.
**************************************************/

let fft;
let under;
let index = 0;
let bins = 32;
let oscillators = [];


function preload() {
  under = loadSound(`assets/sounds/Undercopy.mp3`);
}

function setup() {
  createCanvas(900, 600);
  userStartAudio();

  fft = new p5.FFT();
  console.log(fft);
}

function draw() {
  background(0);
  playback();
  filterbank();
}

function mousePressed() {
  for (let i = 0; i < oscillators.length; i++) {
    let sine = oscillators[i];
    sine.start();
  }
}

function playback() {
  index = map(mouseX, 0, under.frames(), 0, width);
  length = under.duration() - index;
  under.jump(index, length);
}

function filterbank() {
  let spectrum = fft.analyze(bins);
  for (let i = 0; i < bins; i++) {
    let filter = new p5.BandPass();
    let sine = new p5.Oscillator();
    sine.start();
    sine.amp(spectrum[i]);
    sine.freq(spectrum[i]);
    sine.disconnect();
    sine.connect(filter);
    filter.freq((i + 1) * (22050 / bins));
    oscillators.push(sine);
  }
}
