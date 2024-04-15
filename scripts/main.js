
let nn = new NeuralNetwork([2, 2, 1]);

// let W_LL = new Matrix([[[0.5, 1],[0.2, 0.3]]]);let W_L = new Matrix([[[0.6, 0.2]]]);let B_LL = new Matrix([[[0.2],[0.3]]]);let B_L = new Matrix([[[0.5]]]);
let W_LL = new Matrix([[[0.5, 1],[0.2, 0.3]]]);let W_L = new Matrix([[[0.7728, 0.4592]]]);let B_LL = new Matrix([[[0.7184],[0.4728]]]);let B_L = new Matrix([[[1.364]]]);
// let W_LL = new Matrix([[[1.1779, 1],[0.602, 0.3]]]);
// let W_L = new Matrix([[[1.8408, 1.0429]]]);
// let B_LL = new Matrix([[[1.3963],[0.8748]]]);
// let B_L = new Matrix([[[2.2412]]]);
nn.initialize([W_LL, W_L], [B_LL, B_L]);

nn.print();

function ReLU(x) {
    if (x <= 0) {
        return 0;
    } else {
        return x;
    }
}

nn.ff([1, 1], ReLU); 
// nn.feedforward([1, 0]);
