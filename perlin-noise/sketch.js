'use strict';

var g = {
   width: 300,
   height: 300,
   xoff: 0,
   yoff: 0,
   zoff: 0,
   inc: 0.005
};

function setup() {
   let canvas = createCanvas(g.width, g.height);
   canvas.parent('sketch-holder');
   pixelDensity(1);
   // frameRate(10);
}

function draw() {
   g.xoff = 0;
   loadPixels();
   for (let x = 0; x < g.width; x++) {
      g.yoff = 0;
      for (let y = 0; y < g.height; y++) {
         let index = (x + y * width) * 4;
         let val = (0.2 + noise(g.xoff, g.yoff, g.zoff)) * 255;
         pixels[index+0] = val;
         pixels[index+1] = val;
         pixels[index+2] = val;
         pixels[index+3] = 255;
         g.yoff += g.inc;
      }
      g.xoff += g.inc;
   }
   updatePixels();

   g.zoff += g.inc / 10;
}
