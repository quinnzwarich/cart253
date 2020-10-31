"use strict";

/**************************************************
Template p5 project
Pippin Barr

Here is a description of this template p5 project.
**************************************************/

let tiles = [];
let columns = 20;
let rows = 20;

// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(1000, 1000, WEBGL);

  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      let tile = new Chevron(i * 100, j * 50);
      tiles.push(tile);
    }
  }
}

// draw()
//
// Description of draw() goes here.
function draw() {
  background(255);

  translate(- width, -height / 2);
  for (let i = 0; i < tiles.length; i++) {
    let tile = tiles[i];
    tile.display();
  }
}
