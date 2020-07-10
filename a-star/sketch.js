'use strict';

// Depends on minpq.js

var globals = {
   rows: 50,
   cols: 50,
   width: 500,
   height: 500,
   density: 0.3,
   grid: {},
   start: undefined,
   goal: undefined,
   openSet: new MinPq()
};

var Cell = function(i, j) {
   this.i = i;
   this.j = j;
   this.isWall = false;
   this.gScore = Infinity;
   this.hScore = Infinity;
   this.fScore = Infinity;
   this.isStart = false;
   this.isGoal = false;
   this.cameFrom = undefined;

   let rectWidth = globals.width / globals.cols;
   let rectHeight = globals.height / globals.rows;

   this.setWall = function(isWall) {
      if (!this.isStart && !this.isGoal)
         this.isWall = true;
   }

   this.draw = function(col) {
      let c = this.isWall ? 120 : 250;
      if (this.isStart || this.isGoal) c = 0;
      if (col == undefined) fill(c);
      else fill(col);
      rect(this.i*rectWidth, this.j*rectHeight, rectWidth-1, rectHeight-1);
   }

   this.setGScore = function(n) {
      this.gScore = n;
   }

   this.updateHScore = function() {
      // goal is a Cell
      this.hScore = distance(this, globals.goal);
   }

   this.updateFScore = function() {
      if (this.gScore != Infinity
          && this.hScore != Infinity) {
         this.fScore = this.gScore + this.hScore;
      } else {
         throw "Update gscore and hscore first";
      }
   }

   this.setStart = function() {
      this.isStart = true;
   }

   this.setGoal = function() {
      this.isGoal = true;
   }

   this.neighbors = function() {
      let res = [];
      let i = this.i;
      let j = this.j;
      // above
      if (j > 0
          && !globals.grid[i][j-1].isWall)
         res.push(globals.grid[i][j-1]);
      // right
      if (i < globals.cols - 1
          && !globals.grid[i+1][j].isWall)
         res.push(globals.grid[i+1][j]);
      // below
      if (j < globals.rows - 1
          && !globals.grid[i][j+1].isWall)
         res.push(globals.grid[i][j+1]);
      // left
      if (i > 0
          && !globals.grid[i-1][j].isWall)
         res.push(globals.grid[i-1][j]);

      return res;
   }

   this.drawPathFromStart = function() {
      let curr = this;
      while (curr != undefined) {
         curr.draw(color(0, 0, 250));
         curr = curr.cameFrom;
      }
   }
}

function distance(a, b) {
   // Manhattan distance
   return Math.abs(a.i - b.i) + Math.abs(a.j - b.j);
}

function setup() {
   let canvas = createCanvas(globals.width, globals.height);
   canvas.parent('sketch-holder');

   globals.grid = new Array(globals.cols);
   for (let i = 0; i < globals.cols; i++) {
      globals.grid[i] = new Array(globals.rows);
      for (let j = 0; j < globals.rows; j++) {
         globals.grid[i][j] = new Cell(i, j);
      }
   }
   globals.start = globals.grid[0][0];
   globals.start.setStart();
   globals.goal = globals.grid[globals.cols - 1][globals.rows - 1];
   globals.goal.setGoal();
   for (let i = 0; i < globals.cols; i++) {
      for (let j = 0; j < globals.rows; j++) {
         if (Math.random() < globals.density) {
            globals.grid[i][j].setWall(true);
         }
      }
   }

   globals.start.setGScore(0);
   globals.start.updateHScore();
   globals.start.updateFScore();

   globals.openSet.insert(
      new Pair(globals.start.fScore, globals.start)
   );

   noStroke();
}

function draw() {
   for (let i = 0; i < globals.cols; i++) {
      for (let j = 0; j < globals.rows; j++) {
         globals.grid[i][j].draw();
      }
   }

   if (globals.openSet.size() === 0) {
      console.log("Terminating (No more paths to check)");
      noLoop();
      return;
   }

   let els = globals.openSet.getElements();
   for (let i = 0; i < els.length; i++) {
      els[i].getValue().draw(color(255,204,0));
   }

   let minElement = globals.openSet.deleteMin().getValue();
   if (minElement === globals.goal) {
      console.log("Terminating (Found path)");
      minElement.drawPathFromStart();
      noLoop();
      return;
   }

   let neighbors = minElement.neighbors();
   for (let i = 0; i < neighbors.length; i++) {
      let e = neighbors[i];
      let tentativeGScore = minElement.gScore + distance(minElement, e);
      if (tentativeGScore < e.gScore) {
         // This path is better than previously known. Record it
         e.cameFrom = minElement;
         e.setGScore(tentativeGScore);
         e.updateHScore();
         e.updateFScore();

         if(!globals.openSet.hasValue(e)) {
            globals.openSet.insert(new Pair(e.fScore, e));
            e.drawPathFromStart();
         }
      }
   }
}
