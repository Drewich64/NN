function equal_length_text(text, n) {
    if (typeof(text) != "string") text = String(text);
    let l = text.length;
    if (text.length == n) {
        return text;
    }
    if (text.length < n) {
        let res = text.split("");
        for (let i = 0; i < n-text.length; i++) {
            res.push(" ");
        }
        return res.join('');
    }
    if (text.length > n) {
        let res = text.split("");
        return res.splice(0, n).join('');
    }
}

class Matrix {
    constructor(args) {
        switch(args.length) {
            case(1): // Init with array
                if (typeof(args) != "object") break;
                this.arr = args[0];
                this.rows = args[0].length;
                this.cols = args[0][0].length;
            break;
            case(3): // Init with number of rows, cols and value
                this.rows = args[0];
                this.cols = args[1];
                this.arr = [];
                if (args[2] == "random") {
                    this.minitRandom();
                    break;
                }
                this.minitVal(args[2]);
            break;
        }
    }

    print() {
        for (let i = 0; i < this.rows; i++) {
            let outstr = "";
            for (let j = 0; j < this.cols; j++) {
                outstr += equal_length_text(this.arr[i][j], 4) + " ";
            }
            console.log(outstr);
        }
    }

    minit(init_arr) {
        this.arr = init_arr;
    }

    minitVal(val) {
        for (let i = 0; i < this.rows; i++) {
        this.arr.push([]);
            for (let j = 0; j < this.cols; j++) {
                this.arr[i][j] = val;
            }
        }
    }

    minitRandom() {
        for (let i = 0; i < this.rows; i++) {
            this.arr.push([]);
                for (let j = 0; j < this.cols; j++) {
                    this.arr[i][j] = Math.random();
                }
            }
    }

    getDim() {
        return [this.arr.length, this.arr[0].length];
    }
    getRows() {
        return this.arr.length;
    }
    getCols() {
        return this.arr[0].length;
    }

    static madd(matrix1, matrix2) {
        let m1_rows = matrix1.getRows();
        let m1_cols = matrix1.getCols();
        let m2_rows = matrix2.getRows();
        let m2_cols = matrix2.getCols();

        if (m1_rows != m2_rows || m1_cols != m2_cols) {
            alert("Can't add matrices of different size!");
            return null;
        }

        let result = new Matrix([m1_rows, m1_cols, 0]);

        for (let i = 0; i < m1_rows; i++) {
            for (let j = 0; j < m1_cols; j++) {
                result.arr[i][j] = matrix1.arr[i][j] + matrix2.arr[i][j];
            }
        }

        return result;
    }
    nadd(num) {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.arr[i][j] += num;
            }
        }
    }
    static rnadd(m, num) {
        let res = new Matrix([m.rows, m.cols, 0]);
        for (let i = 0; i < m.rows; i++) {
            for (let j = 0; j < m.cols; j++) {
                res.arr[i][j] = m.arr[i][j] + num;
            }
        }
        return res;
    }

    static mmul(m1, m2) {
        if (m1.cols != m2.rows) {
            alert("Can't multiply these matrices.");
            return;
        }

        let result = new Matrix([m1.rows, m2.cols, 0]);

        for (let i = 0; i < result.rows; i++) {
            for (let j = 0; j < result.cols; j++) {
                let term = 0;
                for (let k = 0; k < m1.cols; k++) {
                    term += m1.arr[i][k] * m2.arr[k][j];
                }
                result.arr[i][j] = term;
            }
        }

        return result;
    }
    nmul(k) {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.arr[i][j] *= k;
            }
        }
    }
    static rnmul(m, k) {
        let res = new Matrix([m.rows, m.cols, 0]);
        for (let i = 0; i < m.rows; i++) {
            for (let j = 0; j < m.cols; j++) {
                res.arr[i][j] = m.arr[i][j]*k;
            }
        }
        return res;
    }

    transp() {
        let n = new Matrix([this.cols, this.rows, 0]);
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                n.arr[j][i] = this.arr[i][j];
            }
        }
        return n;
    }

    map(func) {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.arr[i][j] = func(this.arr[i][j]);
            }
        }
    }

    static vectorFrom(arr) {
        let vec = new Matrix([arr.length, 1, 0]);
        for (let i = 0; i < arr.length; i++) {
            vec.arr[i][0] = arr[i];
        }
        return vec;
    }

    // TODO
    // static equationMult(m1, m2, operation) {
    //     let out = [];

    //     for (let i = 0; i < m1.rows; i++) {
    //         for (let j = 0; j < m1.cols; j++) {
    //             out.push(equal_length_text(m1[j][i]));
    //         }
    //     }
    // }
}