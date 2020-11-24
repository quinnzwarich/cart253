"use strict";

/**************************************************
Template p5 project
Pippin Barr

Here is a description of this template p5 project.
**************************************************/

// The map of candy positions with probablity of each spot
let map = [
  [0, 0, 0.4, 0, 0],
  [0, 0.6, 0, 0.8, 0],
  [0.866, 0, 0.932, 0, 1]
];

// The resulting map of candies totals at each position
// Filled out in setup()
let candies = [
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
];

let tileSize = 50;

let numCandies = 31;

function setup() {
  createCanvas(600, 600);

  // Place each one of the candies desired
  for (let i = 0; i < numCandies; i++) {
    // Generate a random number to compare against the probabilities
    // of the different positions...
    let r = random();
    // Remember whether we've placed the current candy in a position yet...
    let placed = false;
    // Go through every row
    for (let row = 0; row < map.length; row++) {
      // Go through every column in the row
      for (let col = 0; col < map[row].length; col++) {
        // Check if the random number is less than the probability of the current
        // position...
        if (r < map[row][col]) {
          // If so, increase the number of candies at that position in the candies array
          candies[row][col]++;
          // Remember we found the position for this candy
          placed = true;
          // Break out of the for loop (the col loop)
          break;
        }
      }
      // Check if we placed the current candy...
      if (placed) {
        // If so, break out of the fot loop (the row loop) so we can place the next one
        break;
      }
    }
  }
}

function draw() {
  // Draw the number of candies at each position according to the map...
  background(0);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(32);
  translate(100, 100);
  for (let row = 0; row < candies.length; row++) {
    for (let col = 0; col < candies[row].length; col++) {
      text(candies[row][col], col * tileSize, row * tileSize);
    }
  }
}
