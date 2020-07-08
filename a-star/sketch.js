'use strict';

var globals = {
   rows: 50,
   cols: 50,
   width: 400,
   height: 400,
   grid: {},
};

var Cell = function(i, j) {
   this.i = i;
   this.j = j;
   this.wall = false;
   let rectWidth = globals.width / globals.cols;
   let rectHeight = globals.height / globals.rows;

   this.setWall = function(isWall) {
      this.wall = true;
   }

   this.draw = function() {
      let color = this.wall ? 0 : 220;
      fill(color);
      rect(this.i*rectWidth, this.j*rectHeight, rectWidth-1, rectHeight-1);
   }
}

function setup() {
   createCanvas(globals.width, globals.height);
   globals.grid = new Array(globals.cols);
   for (let i = 0;i < globals.cols;i++) {
      globals.grid[i] = new Array(globals.rows);
      for (let j = 0;j < globals.rows;j++) {
         globals.grid[i][j] = new Cell(i, j);
         if (Math.random() < 0.3) {
            globals.grid[i][j].setWall(true);
         }
      }
   }
}

function draw() {
   noStroke();
   for (let i = 0;i < globals.cols;i++) {
      for (let j = 0;j < globals.rows;j++) {
         globals.grid[i][j].draw();
      }
   }
   noLoop(); // TODO: remove when there is actual need for looping
}
