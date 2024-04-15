class NeuralNetwork {
    constructor(layers) {
        if (typeof(layers) != 'object') {
            console.log("Neural network constructor argument is an array!");
            return;
        }
        if (layers.length < 2) {
            console.log("Can't make a neural network with this amount of layers");
            return;
        }
        this.layers = layers;
        this.weights = [];
        this.biases = [];
    }

    print() {
        for (let i = 0; i < this.layers.length-1; i++) {
            let w_i = this.weights[i];
            let b_i = this.biases[i];
            console.log("Layer " + i);
            console.log("Weights:");
            w_i.print();
            console.log("Biases:");
            b_i.print();
        }
    }

    initRandom() {
        for (let i = 0; i < this.layers.length-1; i++) {
            this.weights.push(new Matrix([this.layers[i+1], this.layers[i], "random"]));
            this.biases.push(new Matrix([this.layers[i+1], 1, "random"]));
        }
    }

    initialize(w, b) {
        if (w.length != this.layers.length - 1 || b.length != this.layers.length - 1) {
            console.log("Wrong matrix amount when initializing neural network parameters.");
            return;
        }
        for (let i = 0; i < this.layers.length-1; i++) {
            // Init weights
            if (w[i].rows == this.layers[i+1] && w[i].cols == this.layers[i]) {
                this.weights.push(w[i]);
            } else console.log("Wrong matrix size when initializing neural network parameters.");
            // Init biases
            if (b[i].rows == this.layers[i+1] && b[i].cols == 1) {
                this.biases.push(b[i]);
            } else console.log("Wrong matrix size when initializing neural network parameters.");
        }
    }

    sigmoid(x) {
        return 1 / (1 + Math.exp(-x));
    }

    softmax(vec) {
        if (vec.cols > 1) {
            console.log("Softmax fn takes a vector, not a matrix");
            return;
        }
        let n = new Matrix([vec.rows, 1, 0]);
        let denominator = 0;
        for (let i = 0; i < vec.rows; i++) {
            denominator += Math.exp(vec.arr[i][0]);
        }
        for (let k = 0; k < vec.rows; k++) {
            n.arr[k][0] = Math.exp(vec.arr[k][0]) / denominator;
        }
        return n;
    }

    feedforward(arr) {
        let v = Matrix.vectorFrom(arr);
        let prev_act = v;
        for (let i = 0; i < this.layers.length-1; i++) {
            let output = Matrix.mmul(this.weights[i], prev_act);
            output = Matrix.madd(output, this.biases[i]);
            output.map(this.sigmoid);
            prev_act = output;
        }
        console.log("ouput activation:");
        // let out = this.softmax(prev_act);
        let out = prev_act;
        out.map(this.sigmoid);
        out.print();
        return out;
    }

    ff(arr, activationf) {
        let v = Matrix.vectorFrom(arr);
        let prev_act = v;
        for (let i = 0; i < this.layers.length-1; i++) {
            let output = Matrix.mmul(this.weights[i], prev_act);
            output = Matrix.madd(output, this.biases[i]);
            output.map(activationf);
            prev_act = output;
        }
        console.log("ouput activation:");
        // let out = this.softmax(prev_act);
        let out = prev_act;
        // out.map(this.sigmoid());
        out.print();
        return out;
    }

    calculateErrors(input, answer) {
        let err = Matrix.madd(input, answer.map((x)=>-x));
        console.log(err);
    }

    bprop() {

    }

    train(input, answer) {
        let activations = [];
        let v = Matrix.vectorFrom(input);
        let next = v;
        for (let i = 0; i < this.layers.length-1; i++) {
            let output = Matrix.mmul(this.weights[i], next);
            output = Matrix.madd(output, this.biases[i]);
            output.map(this.sigmoid);
            activations.push(output);
            next = output;
        }
        for (let i = 0; i < activations.length; i++) {
            console.log(`Activation ${i+1}:`);
            activations[i].print();
        }



    }

}