"use strict";

/**************************************************
Field of Artificial Flowers
Quinn Zwarich

This simulation generates a field of flowers using perlin noise.
The idea behind the interaction is that it becomes an unending game of
"loves me... loves me not..." that the user plays through uprooting flowers
(as opposed to delicately plucking pedals). In doing so, they also generate notes
from a minor pentatonic scale.
**************************************************/

let font;
let note1;
let note2;
let note3;
let note4;
let note5;
let currentState;

let columns = 0;
let rows = 0;
let scale = 50;

let flowers = [];

function preload() {
  font = loadFont("assets/fonts/england.ttf");
  note1 = loadSound(`assets/sounds/Fsharp3.wav`);
  note2 = loadSound(`assets/sounds/A3.wav`);
  note3 = loadSound(`assets/sounds/B3.wav`);
  note4 = loadSound(`assets/sounds/Csharp4.wav`);
  note5 = loadSound(`assets/sounds/E4.wav`);
}

// try changing the flower args back to arrays
function setup() {
  createCanvas(1000, 1000, WEBGL);
  columns = width / scale;
  rows = height / scale;

  let xOffset = 0;
  let yOffset = 0;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      let noiseValue = noise(xOffset, yOffset);
      if (noiseValue > 0.5) {
        let flowerColourR = map(noiseValue, 0, 1, 0, 255);
        let flowerColourG = map(noiseValue, 0, 1, 0, 255);
        let flowerColourB = map(noiseValue, 0, 1, 0, 255);
        let flowerAngle = map(noiseValue, 0, 1, PI, 2 * PI);
        let flower = new Flower((x * scale)/2, 0, (y * scale)/2,
        flowerColourR, flowerColourG, flowerColourB,
        0, flowerAngle);
        flowers.push(flower)
      }
      yOffset = yOffset + 1.75;
    }
    xOffset = xOffset + 1.75;
  }

  currentState = new Title;
}

function draw() {
  currentState.draw();
}
