"use strict";

/**************************************************
Template p5 project
Pippin Barr

Here is a description of this template p5 project.
**************************************************/

let fft;
let under;
let index = 0;
let bins = 128;
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
  let spectrum = fft.analyze(0, bins);
  let amplitude = fft.waveform(bins);

  for (let i = 0; i < spectrum.length; i++) {
    let filter = new p5.BandPass();
    let sine = new p5.Oscillator();
    filter.freq((i + 1) * (22050 / bins));
    filter.connect(sine);
    sine.amp(amplitude[i]);
    sine.freq(spectrum[i]);
    oscillators.push(sine);
  }
}
