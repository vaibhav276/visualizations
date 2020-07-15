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

    this.swap = (i1, i2) => {
        let temp = this.data[i1];
        this.data[i1] = this.data[i2];
        this.data[i2] = temp;
        this.cost += 3;
    }

    this.sort = () => {
        this.sortImpl(0, this.data.length - 1);
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
        }

        let i = 0;
        let j = mid - start + 1;
        let k = start;

        while (i <= mid - start && j <= end - start) {
            if (temp[i] < temp[j]) {
                this.data[k++] = temp[i++];
            } else {
                this.data[k++] = temp[j++];
            }
        }
        while (i <= mid - start) {
            this.data[k++] = temp[i++];
        }
        while (j <= end - start) {
            this.data[k++] = temp[j++];
        }
    }
}

function getRandomInt(min, max) {
    //The maximum is exclusive and the minimum is inclusive
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}
