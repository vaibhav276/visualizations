'use strict';

var g = {
   width: 600,
   height: 400,
   xRes: 150,
   yRes: 100,
   density: 0.1,
   grid: []
};

function setup() {
   let canvas = createCanvas(g.width, g.height);
   canvas.parent('sketch-holder');

   for (let i = 0; i < g.yRes; i++) {
      g.grid[i] = new Array();
      for (let j = 0; j < g.xRes; j++) {
         g.grid[i][j] = Math.random() < g.density ? true : false;
      }
   }
}

function draw() {
   let xRect = Math.floor(g.width / g.xRes);
   let yRect = Math.floor(g.height / g.yRes);
   noStroke();
   background(59, 0, 128);
   fill(0, 255, 21);
   for (let i = 0; i < g.yRes; i++) {
      for (let j = 0; j < g.xRes; j++) {
         if (g.grid[i][j]) rect(j*xRect, i*yRect, xRect, yRect);
      }
   }

   nextStep();
}

function nextStep() {
   let newGrid = [];
   for (let i = 0; i < g.yRes; i++) {
      newGrid[i] = new Array();
      for (let j = 0; j < g.xRes; j++) {
         newGrid[i][j] = decideFate(i, j);
      }
   }

   g.grid = newGrid;
}

function decideFate(r, c) {
   let anCount = 0; // alive neighbor count

   // north-west
   if (r > 0 && c > 0 && g.grid[r-1][c-1]) anCount++;
   else if (r === 0 && c > 0 && g.grid[g.yRes-1][c-1]) anCount++;
   else if (r === 0 && c === 0 && g.grid[g.yRes-1][g.xRes-1]) anCount++;
   // north
   if (r > 0 && g.grid[r-1][c]) anCount++;
   else if (r === 0 && g.grid[g.yRes-1][c]) anCount++;
   // north-east
   if (r > 0 && c < g.xRes - 1 && g.grid[r-1][c+1]) anCount++;
   else if (r === 0 && c < g.xRes - 1 && g.grid[g.yRes-1][c+1]) anCount++;
   else if (r === 0 && c === g.xRes - 1 && g.grid[g.yRes-1][0]) anCount++;
   // east
   if (c < g.xRes - 1 && g.grid[r][c+1]) anCount++;
   else if(c === g.xRes - 1 && g.grid[r][0]) anCount++;
   // south-east
   if (r < g.yRes - 1 && c < g.xRes - 1 && g.grid[r+1][c+1]) anCount++;
   else if (r === g.yRes - 1 && c < g.xRes - 1 && g.grid[0][c+1]) anCount++;
   else if (r === g.yRes - 1 && c === g.xRes - 1 && g.grid[0][0]) anCount++;
   // south
   if (r < g.yRes - 1 && g.grid[r+1][c]) anCount++;
   else if(r === g.yRes - 1 && g.grid[0][c]) anCount++;
   // south-west
   if (r < g.yRes - 1 && c > 0 && g.grid[r+1][c-1]) anCount++;
   else if (r === g.yRes - 1 && c > 0 && g.grid[0][c-1]) anCount++;
   else if (r === g.yRes - 1 && c === 0 && g.grid[0][g.xRes-1]) anCount++;
   // west
   if (c > 0 && g.grid[r][c-1]) anCount++;
   else if (c === 0 && g.grid[r][g.xRes-1]) anCount++;

   if (anCount === 2) return g.grid[r][c]; // survive
   else if (anCount === 3) return true;    // reproduce
   else return false;                      // overpopulation / underpopulation
}
