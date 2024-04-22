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

    activ_f = (x) => x <= 0 ? 0 : x;
    activ_f_prime = (x) => x <= 0 ? 0 : 1;

    setAciv_f(f, f_prime) {
        this.activ_f = f;
        this.activ_f_prime = f_prime; 
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
            let output = this.weights[i].mmul(prev_act);
            output = output.madd(this.biases[i]);
            output = output.map(this.activ_f);
            prev_act = output;
        }
        console.log("ouput activation:");
        let out = prev_act;
        out.print();
        return out;
    }

    getZ(input) {
        let prev_act = input;    
        let z = [];
        let activations = [];
        activations.push(input);
        z.push(input);
        for (let l = 0; l < this.layers.length - 1; l++) { // Going through all of the Layers
            let output = this.weights[l].mmul(prev_act);
            output = output.madd(this.biases[l]);
            z.push(output);
            if (l < this.layers.length-1) output = output.map(this.activ_f);
            activations.push(output);
            prev_act = output;
        }
        // console.log(Matrix.arrayFrom(activations[activations.length-1]));
        return [z, activations];
    }


    training(data, lr) {
        // data = [[input1, label1], [input2, label2], ... [inputn, labeln]];
        // Where input1 = vector of input layer length, label1 = vector of output layer length

        for (let e = 0; e < data.length; e++) { // Going through all of the data Examples
            let input = data[e][0];
            let label = data[e][1];
            let z_act = this.getZ(input);
            let z = z_act[0];
            let activations = z_act[1];
            // Backpropagation
            // Calculating the dC/da of the output layer
            let output = z[z.length-1];
            let cost = activations[activations.length-1].madd(label.map((x)=>-x)).map((x)=>x*x);


            // Logging the total example cost:
            let cost_arr = Matrix.arrayFrom(cost);

            console.log(`${Matrix.arrayFrom(activations[0])} => ${Matrix.arrayFrom(activations[activations.length-1])}\t|\t${Matrix.arrayFrom(label)}\t|\tC0:\t${cost_arr}`);
            // console.log(`Total cost:\t${cost_arr.reduce((prev, cur, ind)=>prev+cur)/cost_arr.length}`);


            // Calculating dC/dw and dC/db for all of the layers:
            let out_dCda = output.madd(label.map((x)=>-x)).map((x)=> 2*x);

            let dCdws = [];
            let dCdbs = [];

            let current_dCda = out_dCda;
            for (let l = this.layers.length-1; l > 0; l--) {
                // Find previous layer
                // l - layer number from ouput to input (0)

                let current_dCdw = z[l].map(this.activ_f_prime).expmmul(activations[l-1].transp()).byv(current_dCda);
                let current_dCdb = z[l].map(this.activ_f_prime).byv(current_dCda);
                dCdws.push(current_dCdw);
                dCdbs.push(current_dCdb);
                
                
                let prev_da1da0 = this.weights[l-1].byv(z[l].map(this.activ_f_prime)).transp();
                let prev_dCda = prev_da1da0.mmul(current_dCda);
                current_dCda = prev_dCda;
            }

            // Adjusting the weights according to dC/dw's and biases according to dC/db's
            for (let l = 0; l < this.layers.length-1; l++) {
                this.weights[l] = this.weights[l].madd(dCdws[this.layers.length-2-l].map((x)=>-x*lr));
                this.biases[l] = this.biases[l].madd(dCdbs[this.layers.length-2-l].map((x)=>-x*lr));
            }
        }
    }

    learn(data, lr, iterations) {
        for (let i = 0; i < iterations; i++) {
            console.log(`Iteration ${i}`)
            this.training(data, lr);
        }
    }

    getWeights() {
        let weights = [];
        for (let l = 0; l < this.layers.length-1; l++) {
            weights.push(this.weights[l].arr);
        }
        return weights;
    }

    getBiases() {
        let biases = [];
        for (let l = 0; l < this.layers.length-1; l++) {
            biases.push(this.biases[l].arr);
        }
        return biases;
    }
}