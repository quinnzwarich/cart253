"use strict";

/**************************************************




**************************************************/

let redroom;
let clown;
let newBackground

function preload() {
  redroom = createVideo(`assets/images/redroom.mp4`);
  clown = loadImage(`assets/images/clown.png`);
}

function setup() {
  createCanvas(960, 540, WEBGL);
  pixelDensity(1);

  redroom.loop();
  redroom.hide();
}

function draw() {
  background(127);


  texture(redroom);
  rect(-width/2, -height/2, width, height);


  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      let index = (i + j * width) * 3;
      pixels[index] = pixels[index] + redroom.pixels[index];
      pixels[index + 1] = pixels[index + 1] + redroom.pixels[index + 1];
      pixels[index + 2] = pixels[index + 2] + redroom.pixels[index + 2];
    }
  }

}
