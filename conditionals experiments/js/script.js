

let angle = 0;

function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(0);

push();
fill(255, 0, 0);
rectMode(CENTER);
translate(width/2, height/2);
rotate(angle);
rect(0, 0, 100, 100);
pop();

angle = angle + 0.01;

}
