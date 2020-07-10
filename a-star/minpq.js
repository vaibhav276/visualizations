let Pair = function(k, v) {
    this.key = k;
    this.value = v;

    this.compare = that => {
        return this.key - that.key;
    }

    this.getValue = () => {
        return this.value;
    }
}

let MinPq = function() {
    this.elements = []; // Pair must be used as elements
    this.sz = 0;

    this.insert = e => {
        this.elements[this.sz] = e;
        this.sz = this.sz + 1;
        this.swim(this.sz - 1);
    }

    this.deleteMin = () => {
        let e = this.elements[0];
        this.sz = this.sz - 1;
        this.elements[0] = this.elements[this.sz];
        this.sink(0);
        return e;
    }

    this.swim = idx => {
        let curr = idx;
        let parent = Math.floor((curr + 1)/ 2) - 1;
        while (parent >= 0
               && this.elements[curr].compare(this.elements[parent]) < 0) {
            this.swap(curr, parent);
            curr = parent;
            parent = Math.floor((curr + 1)/ 2) - 1;
        }
    }

    this.sink = idx => {
        let sz = this.sz;
        let curr = idx;
        while (curr * 2 + 1 < sz) { // there is a child
            let min = curr * 2 + 1; // left child is guaranteed
            if (min + 1 < sz) {     // right child exists?
                if (this.elements[min+1].compare(this.elements[min]) < 0) {
                    // and is smaller than left child
                    min = min + 1;
                }
            }
            this.swap(min, curr);
            curr = min;
        }
    }

    this.swap = (i1, i2) => {
        let temp = this.elements[i1];
        this.elements[i1] = this.elements[i2];
        this.elements[i2] = temp;
    }

    this.size = () => {
        return this.sz;
    }

    this.getElements = () => {
        return this.elements;
    }

    this.hasValue = v => {
        for (let i = 0; i < this.sz; i++) {
            if (this.elements[i].getValue() === v) {
                return true;
            }
        }
        return false;
    }
}
