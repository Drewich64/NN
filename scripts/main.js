
let nn = new NeuralNetwork([2, 2, 1]);

let W_LL = new Matrix([[
    [0.5, 1],
    [0.2, 0.3]
]]);
let W_L = new Matrix([[
    [0.6, 0.2]
]]);
let B_LL = new Matrix([[
    [0.2],
    [0.3]
]]);
let B_L = new Matrix([[
    [0.5]
]]);

nn.initialize([W_LL, W_L], [B_LL, B_L]);

function ReLU(x) {
    if (x <= 0) {
        return 0;
    } else {
        return x;
    }
}

// nn.ff([0, 0], ReLU); 
nn.feedforward([0, 0]);
