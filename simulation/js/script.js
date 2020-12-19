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

let kieren;
let font;
let note1;
let note2;
let note3;
let note4;
let note5;
let currentState;

let flowers = [];
let grid = [
  [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0],
  [0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0],
  [0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0],
  [0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0],
  [0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0],
  [1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1],
  [1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1],
  [1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1],
  [1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1],
  [1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1],
  [1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1],
  [1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1],
  [0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0],
  [0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0],
  [0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0],
  [0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0],
  [0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
];
let rows = 13;
let columns = 13;
let imageRows = 960;
let imageColumns = 960;
let scale = 32;


function preload() {
  kieren = loadImage(`assets/images/File_000 (1).jpeg`)
  font = loadFont("assets/fonts/england.ttf");
  note1 = loadSound(`assets/sounds/Fsharp3.wav`);
  note2 = loadSound(`assets/sounds/A3.wav`);
  note3 = loadSound(`assets/sounds/B3.wav`);
  note4 = loadSound(`assets/sounds/Csharp4.wav`);
  note5 = loadSound(`assets/sounds/E4.wav`);
}

function setup() {
  createCanvas(1000, 1000, WEBGL);

  // let xOffset = 0;
  // let yOffset = 0;
  // for (let j = 0; j < grid.length; j++) {
  //   let row = grid[j];
  //   for (let i = 0; i < row.length; i++) {
  //     let position = row[i];
  //     let noiseValue = noise(xOffset, yOffset);
  //     if (position === 1) {
  //       console.log(`true`);
  //       if (noiseValue > 0.5) {
  //         let r = map(noise(xOffset), 0, 1, 127, 255);
  //         let g = map(noise(yOffset), 0, 1, 127, 255);
  //         let b = map(noise(xOffset, yOffset), 0, 1, 127, 255);
  //         let angle = map(noiseValue, 0, 1, PI, 2 * PI);
  //         let flower = new Flower((i * scale)/2, (j * scale)/2, 0,
  //         r, g, b, 0, angle);
  //         flowers.push(flower);
  //       }
  //     }
  //     xOffset = xOffset + 0.3;
  //   }
  //   yOffset = yOffset + 0.3;
  // }

  kieren.loadPixels();
  for (let j = 0; j < imageRows; j += 16) {
    for (let i = 0; i < imageColumns; i += 16) {
      let index = (j * imageRows + i) * 4;
      let r = kieren.pixels[index + 0];
      let g = kieren.pixels[index + 1];
      let b = kieren.pixels[index + 2];
      let angle = map((r + g + b) / 3, 0, 255, 0, 2 * PI);
      let flower = new Flower(i, j, 0, r, g, b, 0, angle);
      flowers.push(flower);
    }
  }

  currentState = new Title;
}

function draw() {
orbitControl();
currentState.draw();
}

function keyPressed() {
  currentState.keyPressed();
}
