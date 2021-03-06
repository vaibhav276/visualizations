'use strict';

// depends on 'merge-sort.js'

let g = {
   width: 800,
   height: 450,
   numDataPoints: 100,
   minDataValue: 1,
   maxDataValue: 100,
   sorter: undefined,
   drawQueue: []
}

function setup() {
   let canvas = createCanvas(g.width, g.height);
   canvas.parent('sketch-holder');

   g.sorter = new MergeSort();
   g.sorter.initializeRandomData(g.numDataPoints,
                                 g.minDataValue,
                                 g.maxDataValue);
   g.sorter.setOnUpdateCallback(onUpdate);
   g.sorter.setOnDoneCallback(onDone);

   noLoop();
   g.sorter.sort(); // will call onUpdate for every display event
   loop(); // start processing display events
}

// callback from sorter for updating UI
function onUpdate(ev) {
   g.drawQueue.push(ev); // push at end
}

// callback from sorter to indicate sorting is done
function onDone() {
   g.drawQueue.push(null); // mark end of queue
}

function draw() {
   let ev = g.drawQueue.shift(); // pop first
   if (ev == undefined) return;
   if (ev == null) noLoop();

   let rectBase = g.height - 250;
   let rectWidth = g.width / g.numDataPoints;
   let [hlIdxMin, hlIdxMax] = ev.hlIndexRange;
   let [doneMin, doneMax] = ev.doneRange;

   background(255);
   for (let i = 0; i < ev.data.length; i++) {
      let c = color(249, 235, 165);
      if (i >= hlIdxMin
          && i <= hlIdxMax) {
         c = color(153, 255, 255);
      }
      if (ev.hlIndicies.includes(i)) {
         c = color(16, 155, 165);
      }
      if (i >= doneMin
          && i <= doneMax) {
         c = color(16, 155, 165);
      }
      fill(c);
      noStroke();
      rect(i * rectWidth + 1,
           rectBase - 1,
           rectWidth - 3,
           0 - ev.data[i]*(
              rectBase / (g.maxDataValue - g.minDataValue)
           )
          );
   }

   textSize(20);
   fill(0);
   text('Total (N):    ' + g.numDataPoints, 10, rectBase + 20);
   text('Sorted:       ' + (doneMax - doneMin), 10, rectBase + 40);
   text('Cost:         ' + ev.cost, 10, rectBase + 60);
}
