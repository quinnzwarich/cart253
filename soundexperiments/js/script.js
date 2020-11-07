"use strict";

/**************************************************
Template p5 project
Pippin Barr

Here is a description of this template p5 project.
**************************************************/

let omnichord;
let voice;
let harmonyFrequency = [65.41, 73.41, 82.41, 87.31, 98, 110, 123.97, 130.81, 146.83, 164.81, 174.61];
let notes = [`C4`, `D4`, `E4`, `F4`, `G4`, `A4`, `B4`, `C5`, `D5`, `E5`, `F5`, `G5`];
let numVoices = 3;
let numChords = 8;

function setup() {
  createCanvas(900, 600);
  userStartAudio();

  omnichord = new Visual();
  voice = new p5.PolySynth();
}

function draw() {
  background(0);
  sequence();
  omnichord.drawOmni();
}

function sequence() {
  for (let i = 0; i < numChords; i++) {
    if (keyIsDown(49)) {
      voice.play(notes[0], 0.1, 0, 0.25);
      voice.play(notes[2], 0.1, 0, 0.25);
      voice.play(notes[4], 0.1, 0, 0.25);
    }
    else if (keyIsDown(49 + i) && i > 0) {
      voice.play(notes[i], 0.1, 0, 0.25);
      voice.play(notes[i + 2], 0.1, 0, 0.25);
      voice.play(notes[i + 4], 0.1, 0, 0.25);
    }
  }
}
// function sequence() {
//   for (let i = 0; i < voices.length; i++) {
//     let voice = voices[i];
//     for (let j = 0; j < numChords; j++) {
//       if (keyIsDown(49 + j)) {
//         voice.start();
//         voice.freq(harmonyFrequency.slice(i * 2));
//       }
//     }
//   }
// }
