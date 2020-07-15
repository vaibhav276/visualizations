let SelectionSort = function() {
    this.data = [];
    this.onUpdateCallback = undefined;
    this.onDoneCallback = undefined;
    this.cost = 0;

    this.initializeRandomData = (size, lower, upper) => {
        for (let i = 0; i < size; i++) {
            this.data[i] = getRandomInt(lower, upper);
        }
    }

    this.setOnUpdateCallback = cb => {
        this.onUpdateCallback = cb;
    }

    this.setOnDoneCallback = cb => {
        this.onDoneCallback = cb;
    }

    this.swap = (i1, i2) => {
        let temp = this.data[i1];
        this.data[i1] = this.data[i2];
        this.data[i2] = temp;
        this.cost += 3;
    }

    this.sort = () => {
        let sorted = -1;
        while (sorted < this.data.length - 1) {
            let min = Infinity;
            let minIdx = -1;
            let dataCopy = [...this.data];
            for (let i = sorted + 1; i < this.data.length; i++) {
                this.cost++;
                if (this.data[i] < min) {
                    minIdx = i;
                    min = this.data[i];
                }

                this.onUpdateCallback({
                    data: dataCopy,
                    hlIndexRange: [sorted + 1, i],
                    doneRange: [-1, sorted],
                    hlIndicies: [minIdx],
                    cost: this.cost
                });
            }

            this.swap(sorted + 1, minIdx);
            sorted++;

            this.onUpdateCallback({
                data: [...this.data],
                hlIndexRange: [-1, -1],
                doneRange: [-1, sorted],
                hlIndicies: [],
                cost: this.cost
            });
        }

        this.onDoneCallback();
    }
}

function getRandomInt(min, max) {
    //The maximum is exclusive and the minimum is inclusive
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}
