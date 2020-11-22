"use strict";

/**************************************************
Template p5 project
Pippin Barr

Here is a description of this template p5 project.
**************************************************/

let request = require(`request`);
let user_id = `Gdivya`;
let token = `Bearer AQAeUYuIADVs3O12JoZLUD58ay7QAIedm9TEwHJCViZDivBLq8kAgsUvcAwK_PySE8T75oSRV70u0etHNebesvCphbmxjlEb4HlgE0rpWAQT0hIcyfBfXMmr6bbKB8RSDqA`;
let playlists_url = `https://api.spotify.com/v1/users/`+user_id+`/playlists`;

request({url:playlist_url, headers:{`authorization`:token}}, function(err, res) {
  if (res) {
      let playlists = JSON.parse(res.body);
      let playlist_url = playlists.items[0].href
      request({url:playlist_url, headers:{`authorization`:token}}, function(err, res) {
        if (res) {
            let playlist = JSON.parse(res.body);
            // insert stuff here
      }
    })
  }
})

let candyModel;
let candies = [];
let numCandies = 5;

function preload() {
  // is about 87.5 (75?) pixels below where it should be
  // it's dimensions are 115, 30, 60
  candyModel = loadModel(`assets/images/candy.OBJ`);
}

function setup() {
  createCanvas(750, 750, WEBGL);

  for (let i = 0; i < numCandies; i++) {
    let x = random(-1, 1);
    let y = random(-1, 1);
    let z = random(-1, 1);
    let candy = new Candy(x, -height/tan(PI*30.0 / 180.0) + y, z, 0, 1, 0, i, candies);
    candies.push(candy);
  }
}

function draw() {
  background(255);
  orbitControl();
  drawRoom();

  for (let i = 0; i < candies.length; i++) {
    let candy = candies[i];
    let gravity = createVector(0, 2, 0);
    candy.gravity(gravity);
    candy.move();
    candy.checkOverlapFloor();
    candy.checkOverlapCandy();
    candy.display();
  }
}

function platform() {
  push();
  beginShape();
  vertex(-width/tan(PI*30.0 / 180.0), height/2, -width/tan(PI*30.0 / 180.0));
  vertex(-width/tan(PI*30.0 / 180.0), height/2, width/2);
  vertex(width/tan(PI*30.0 / 180.0), height/2, width/2);
  vertex(width/tan(PI*30.0 / 180.0), height/2, -width/tan(PI*30.0 / 180.0));
  endShape(CLOSE);
  pop();
}

function leftWall() {
  push();
  beginShape();
  vertex(-width/tan(PI*30.0 / 180.0), height/2, width/2);
  vertex(-width/tan(PI*30.0 / 180.0), -height/tan(PI*30.0 / 180.0), width/2);
  vertex(0, -height/tan(PI*30.0 / 180.0), -width/tan(PI*30.0 / 180.0));
  vertex(0, height/2, -width/tan(PI*30.0 / 180.0));
  endShape(CLOSE);
  pop();
}

function rightWall() {
  push();
  beginShape();
  vertex(width/tan(PI*30.0 / 180.0), height/2, width/2);
  vertex(width/tan(PI*30.0 / 180.0), -height/tan(PI*30.0 / 180.0), width/2);
  vertex(0, -height/tan(PI*30.0 / 180.0), -width/tan(PI*30.0 / 180.0));
  vertex(0, height/2, -width/tan(PI*30.0 / 180.0));
  endShape(CLOSE);
  pop();
}

function drawRoom() {
  platform();
  leftWall();
  rightWall();
}
