function makeData(arr, input_num, label_num) {
    let res = [];
    for (let i = 0; i < arr.length/(input_num+label_num); i++) {
        res.push([Matrix.vectorFrom(arr.slice(i*(input_num+label_num), i*(input_num+label_num)+input_num)), Matrix.vectorFrom(arr.slice(i*(input_num+label_num)+input_num, i*(input_num+label_num)+input_num+label_num))]);

    }
    return res;
}

function convertToMatrix(weights, biases) {
    let w_out = [];
    let b_out = [];
    for (let i = 0; i < weights.length; i++) {
        w_out.push(new Matrix([weights[i]]));
        b_out.push(new Matrix([biases[i]]));
    }
    return [w_out, b_out];
}

let ReLU = (x) => x <= 0 ? 0 : x; let ReLU_prime = (x) => x <= 0 ? 0 : 1;
let sigmoid = (x) => 1 / (1 + Math.exp(-x)); let sigmoid_prime = (x) => sigmoid(x) * (1 - sigmoid(x));

// let data = [0, 0, 5, 1, 0, 7, 0, 1, 8, 1, 1, 10, 2, 0, 9, 2, 1, 12, -1, 2, 9, -1, -1, 0, -2, 2, 7, 2, 2, 15];
// let training_data = makeData(data, 2, 1);
// let data = [1, 0, 1, 0, 1, 0, 1, 0, 1, -1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, -1];
// let training_data = makeData(data, 9, 2);
// first 9 - pixels from top to bottom left to right, next 2 labels 10th - cross, 11th - plus

// let data = [
//     1, 0, 0,
//     100, 0, 0,
//     0, 0, 0,
//     0, 0, 0,
//     0, 1, 0,
//     0, 100, 0
// ];
// let training_data = makeData(data, 3, 3);

// let data = [
//     0, 0,
//     1, 1,
//     2, 4,
//     4, 16,
//     6, 36, 
//     7, 49, 
//     8, 64,
//     -0.5, 0.25,
//     -3, 9,
//     -5, 25
// ];
// let training_data = makeData(data, 1, 1);


// let W_LL = new Matrix([[[0.5, 1],[0.2, 0.3]]]);let W_L = new Matrix([[[0.6, 0.2]]]);let B_LL = new Matrix([[[0.2],[0.3]]]);let B_L = new Matrix([[[0.5]]]);

let data = [
    1, 0, 0, 0,
    0, 1,
    0, 0, 0, 1,
    1, 0,
    0, 0, 0, 0,
    0, 0,
    1, 0, 0, 1,
    1, 1
];
let training_data = makeData(data, 4, 2);

let nn = new NeuralNetwork([4, 10, 7, 8, 2]);
nn.initRandom();

// let biases = [
//     [
//         [
//             -2.4998445502435374
//         ],
//         [
//             -2.304479468432249
//         ]
//     ],
//     [
//         [
//             -1.175141264908755
//         ]
//     ]
// ];
// let weights = [
//     [
//         [
//             1.5724568879962213
//         ],
//         [
//             1.6244482415061816
//         ]
//     ],
//     [
//         [
//             2.3226466879270964,
//             2.2493524507947105
//         ]
//     ]
// ];
// let conv = convertToMatrix(weights, biases);
// nn.initialize(conv[0], conv[1]);

// nn.initRandom();
// nn.initialize([W_LL, W_L], [B_LL, B_L]);
nn.print();
nn.setAciv_f(ReLU, ReLU_prime);


nn.learn(training_data, 0.0001, 7);


