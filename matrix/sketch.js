var globals = {
    rows: 40,
    cols: 60,
    width: 600,
    height: 400,
    grid: {},
    symbols: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
    frameCount: 0,
    dropSpeed: 10,
    dropFrequency: 2
};

Array.prototype.randomElement = function () {
    return this[Math.floor(Math.random() * this.length)];
}

let Cell = function (i, j) {
    this.symbol = '.';
    this.intensity = 0;
    this.isDrop = false;

    this.setDrop = function() {
        this.isDrop = true;
        this.intensity = 1.0;
    }
    this.exitDrop = function() {
        // symbol
        if (!this.isDrop && Math.random() < 0.05)
            globals.grid[i][j].symbol = globals.symbols.randomElement();

        // intensity
        if (this.intensity == 1) this.intensity = 0.99;
        else if (this.intensity > 0.9) this.intensity -= 0.1;
        else if (this.intensity > 0 && Math.random() < 0.1) this.intensity -= Math.random()* 0.5;
        if (this.intensity < 0) this.intensity = 0.2;

        this.isDrop = false;
    }
}

function setup() {
    let canvas = createCanvas(globals.width, globals.height);
    canvas.parent('sketch-holder');

    globals.grid = new Array(globals.cols);
    for (let i = 0; i < globals.cols; i++) {
        globals.grid[i] = new Array(globals.rows);
        for (let j = 0; j < globals.rows; j++) {
            globals.grid[i][j] = new Cell(i, j);
            globals.grid[i][j].symbol = globals.symbols.randomElement();
        }
    }

    noStroke();
    // noLoop();
    frameRate(24);
}

function draw() {
    background(0);

    if (globals.frameCount % globals.dropFrequency == 0) {
        // time for a new drop
        let col = Math.floor(Math.random() * globals.cols);
        globals.grid[col][0].setDrop();
    }

    for (let i = 0; i < globals.grid.length; i++) {
        const gridRow = globals.grid[i];
        for (let j = 0; j < gridRow.length; j++) {
            const element = gridRow[j];
            let gridX = globals.width / globals.cols;
            let gridY = globals.height / globals.rows;
            textSize(gridX);
            if (element.intensity == 1) fill(255);
            else fill(0, 255 * element.intensity, 0);
            text(element.symbol, i * gridX, (j + 1) * gridY);
        }
    }

    // update drops
    // TODO: Why is the drop symbol changing?
    for (let i = 0; i < globals.grid.length; i++) {
        const gridRow = globals.grid[i];
        for (let j = 0; j < gridRow.length; j++) {
            const element = gridRow[j];
            let found = false;
            if (element.isDrop) {
                if (j + 1 < gridRow.length)
                    gridRow[j + 1].setDrop()
                found = true;
            }
            element.exitDrop();
            if (found) break;
        }
    }

    globals.frameCount++;
    if (globals.frameCount == 1000) globals.frameCount = 0; // dont neet to count that far
}

