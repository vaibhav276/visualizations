let MergeSort = function() {
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

    this.sort = () => {
        this.cost = 0;
        this.sortImpl(0, this.data.length - 1);
        this.onUpdateCallback({
            data: [...this.data],
            hlIndexRange: [-1, -1],
            doneRange: [0, this.data.length],
            hlIndicies: [],
            cost: this.cost
        });
        this.onDoneCallback();
    }

    this.sortImpl = (start, end) => {
        if (start >= end) return;

        let mid = Math.floor(start + ((end - start) / 2));
        this.sortImpl(start, mid);
        this.sortImpl(mid+1, end);
        this.mergeImpl(start, mid, end);
    }

    this.mergeImpl = (start, mid, end) => {
        let temp = []
        for (let i = start; i <= end; i++) {
            temp.push(this.data[i]);
            this.cost++;
        }

        this.onUpdateCallback({
            data: [...this.data],
            hlIndexRange: [start, end],
            doneRange: [-1, -1],
            hlIndicies: [],
            cost: this.cost
        });

        let i = 0;
        let j = mid - start + 1;
        let k = start;

        while (i <= mid - start && j <= end - start) {
            this.onUpdateCallback({
                data: [...this.data],
                hlIndexRange: [start, end],
                doneRange: [-1, -1],
                hlIndicies: [k],
                cost: this.cost
            });
            if (temp[i] < temp[j]) this.data[k++] = temp[i++];
            else this.data[k++] = temp[j++];
            this.cost++;
        }
        while (i <= mid - start) {
            this.onUpdateCallback({
                data: [...this.data],
                hlIndexRange: [start, end],
                doneRange: [-1, -1],
                hlIndicies: [k],
                cost: this.cost
            });
            this.data[k++] = temp[i++];
            this.cost++;
        }
        while (j <= end - start) {
            this.onUpdateCallback({
                data: [...this.data],
                hlIndexRange: [start, end],
                doneRange: [-1, -1],
                hlIndicies: [k],
                cost: this.cost
            });
            this.data[k++] = temp[j++];
            this.cost++;
        }
    }
}

function getRandomInt(min, max) {
    //The maximum is exclusive and the minimum is inclusive
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}
