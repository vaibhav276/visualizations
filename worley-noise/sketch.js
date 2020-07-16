'use strict';

var g = {
   width: 300,
   height: 300,
   numSeeds: 15,
   seeds: [],
   neighbor: 0, // n-th closest,
   maxDist: 0
};

function setup() {
   let canvas = createCanvas(g.width, g.height);
   canvas.parent('sketch-holder');

   for (let i = 0; i < g.numSeeds; i++) {
      g.seeds.push(new p5.Vector(randomInt(0, g.width), randomInt(0, g.height)));
   }
   g.maxDist = Math.sqrt(g.width*g.width + g.height*g.height) / 2;
}

function draw() {
   noStroke();
   for (let i = 0; i < g.width; i++) {
      for (let j = 0; j < g.height; j++) {
         let d = [];
         for (let k = 0; k < g.seeds.length; k++) {
            d.push(dist(g.seeds[k].x, g.seeds[k].y, i, j));
         }
         d.sort((a, b) => a - b);
         let nthNeighborDist = d[g.neighbor];
         let cr = Math.ceil(map(nthNeighborDist, 0, g.maxDist, 200, 215));
         let cg = Math.ceil(map(nthNeighborDist, 10, g.maxDist, 120, 170));
         let cb = Math.ceil(map(nthNeighborDist, 0, g.maxDist, 200, 255));
         stroke(cr, cg, cb);
         point(i, j);
      }
   }
   fill(237, 173, 255);
   for (let i = 0; i < g.numSeeds; i++) {
      circle(g.seeds[i].x, g.seeds[i].y, 10);
   }

   moveSeeds();
}

function randomInt(min, max) {
   return Math.floor(random(min,max));
}

function moveSeeds() {
   for (let i = 0; i < g.numSeeds; i++) {
      g.seeds[i].x += randomInt(-15, 15);
      g.seeds[i].y += randomInt(-15, 15);
      if (g.seeds[i].x < 0) g.seeds[i].x += g.width;
      if (g.seeds[i].x > g.width) g.seeds[i].x -= g.width;
      if (g.seeds[i].y < 0) g.seeds[i].y += g.height;
      if (g.seeds[i].y > g.height) g.seeds[i].y -= g.height;
   }
}
