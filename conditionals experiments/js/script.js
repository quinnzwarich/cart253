/**************************************************
Template p5 project
Pippin Barr

Here is a description of this template p5 project.
**************************************************/

let caterpillar = {
  x: 0,
  y: 250,
  segmentSize: 5
}

function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(0);
  noStroke();
  fill(100,200,100);

  let x = caterpillar.x;
  let runSegments = 500;
  let segmentsDrawn = 0;

  while (segmentsDrawn < runSegments) {
    ellipse(x, caterpillar.y, caterpillar.segmentSize);
    x = x + 4;
    segmentsDrawn = segmentsDrawn + 1;
  }
}
