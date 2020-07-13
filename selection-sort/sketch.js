'use strict';

// depends on 'sorter.js'

let globals = {
   width: 800,
   height: 200,
   numDataPoints: 100,
   minDataValue: 1,
   maxDataValue: 100,
   sorter: undefined,
   executeToggle: false,
   pos: -1,
}

function setup() {
   let canvas = createCanvas(globals.width, globals.height);
   canvas.parent('sketch-holder');

   globals.sorter = new Sorter();
   let tempData = []
   for (let i = 0; i < globals.numDataPoints; i++) {
      tempData[i] = Math.floor(Math.random() * globals.maxDataValue)
                  + globals.minDataValue;
   }
   globals.sorter.setData(tempData);
}

function draw() {
   stroke(0);
   // rect(0, 0, globals.width, globals.height);
   let rectWidth = globals.width / globals.numDataPoints;

   background(255);
   if (globals.executeToggle == false) {
      let {cost, pos1, pos2} = globals.sorter.prepareStep();
      let fr = (globals.numDataPoints / cost) * 5;
      frameRate(fr);
      let data = globals.sorter.getData();
      for (let i = 0; i < globals.numDataPoints; i++) {
         if (i == pos1) {
            fill('blue');
         } else if (i == pos2) {
            fill('red')
         } else {
            fill(240, 240, 240);
         }
         rect(i * rectWidth + 1,
              globals.height - 1,
              rectWidth - 3,
              0 - data[i]*(
                 globals.height/(globals.maxDataValue - globals.minDataValue)
              )
             );
      }
   } else {
      globals.sorter.executeStep();
      let data = globals.sorter.getData();
      fill(240, 240, 240);
      for (let i = 0; i < globals.numDataPoints; i++) {
         rect(i * rectWidth + 1,
              globals.height - 1,
              rectWidth - 3,
              0 - data[i]*(
                 globals.height/(globals.maxDataValue - globals.minDataValue)
              )
             );
      }
      globals.pos = globals.pos + 1;
   }
   globals.executeToggle = !globals.executeToggle;

   if (globals.pos >= globals.numDataPoints - 2) {
      noLoop();
   }
}
