let Sorter = function() {
    this.data = [];
    this.stepMetadata = {
        pos: 0,
        minIdx: -1
    }

    this.setData = xs => {
        for (let i = 0; i < xs.length; i++) {
            this.data[i] = xs[i];
        }
    }

    this.prepareStep = () => {
        let min = Infinity;
        let cost = 0;
        for (let i = this.stepMetadata.pos;
             i < this.data.length; i++) {
            if (this.data[i] < min) {
                min = this.data[i];
                this.stepMetadata.minIdx = i;
            }
            cost = cost + 1;
        }
        return {
            'cost': cost,
            'pos1': this.stepMetadata.pos,
            'pos2': this.stepMetadata.minIdx
        };
    }

    this.executeStep = () => {
        this.swap(this.stepMetadata.pos, this.stepMetadata.minIdx)
        this.stepMetadata.pos = this.stepMetadata.pos + 1;
    }

    this.getData = () => {
        return this.data;
    }

    this.swap = (i1, i2) => {
        let temp = this.data[i1];
        this.data[i1] = this.data[i2];
        this.data[i2] = temp;
    }
}
