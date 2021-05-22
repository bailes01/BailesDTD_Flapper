// import { Matrix } from "./matrix";

class Layer_Dense {
  constructor(n_inputs, n_neurons) {
    if (n_inputs != undefined) {
      this.weights = new Matrix(n_inputs, n_neurons);
      this.weights.fillRand(0, 0.1);
      this.biases = new Matrix(1, n_neurons);
      this.biases.fillRand(0, 0.1);
    }
  }
    
    // console.log(this.weights);
    // console.log(this.biases);
  

  addRandom = (m, s) => m + Matrix.randn(0, s);

  forward(inputs) {
    this.output = Matrix.add(Matrix.dot(inputs, this.weights), this.biases);
  }

  update_weights(stdev) {
    this.weights.opFunc(this.addRandom, stdev);
  }

  update_biases(stdev) {
    this.biases.opFunc(this.addRandom, stdev);
  }

  copy() {
    let out = new Layer_Dense();
    out.weights = this.weights.copy();
    out.biases = this.biases.copy();
    return out;
  }
}

class A_ReLU {
  forward(inputs) {
    this.output = Matrix.modFunc((i) => (i < 0 ? 0 : i), inputs);
  }
  copy() {
    return new A_ReLU();
  }
}

class A_SoftMax {
  forward(inputs) {
    var sub_inputs = Matrix.sub(inputs, inputs.max(1, true));
    var exp_values = Matrix.modFunc((i) => Math.E ** i, sub_inputs);
    var probs = Matrix.div(exp_values, exp_values.sum(1, true));
    this.output = probs;
    return;
  }
  copy() {
    return new A_SoftMax();
  }
}

class Loss {
  calculate(output, y) {
    var sample_losses = this.forward(output, y);
    var data_loss = sample_losses.mean();
    return data_loss;
  }
}

class L_CategCrossEnt extends Loss {
  forward(y_preds, y_true) {
    var y_preds_clipped = Matrix.clip(y_preds, 10e-8, 1 - 10e-8);
    if (y_true.rows() != 1) {
      y_true = y_true.iOfMax(1);
    }
    var confidences = y_preds_clipped.selectNth(y_true);
    var neg_log_probs = Matrix.modFunc((x) => -Math.log(x), confidences);
    return neg_log_probs;
  }
}


class Accuracy {
  calculate(preds, targets) {
    var preds = preds.iOfMax(1);
    if (targets.rows() != 1) {
      targets = targets.iOfMax(1);
    }
    var sum = 0;
    for (let i = 0; i < preds.cols(); i++) {
      if (preds.grid[0][i] === targets.grid[0][i]) sum++;
    }
    return sum / preds.cols();
  }
}

class NeuralNetwork{
  constructor(i, h, o) {
    this.i = i;
    this.h = h;
    this.o = o;
    this.layer1 = new Layer_Dense(i, h);
    this.layer2 = new Layer_Dense(h, o);
    this.act1 = new A_ReLU();
    this.act2 = new A_SoftMax();
  }

  predict(inputs) {
    inputs = new Matrix(inputs);
    this.layer1.forward(inputs);
    this.act1.forward(this.layer1.output);
    this.layer2.forward(this.act1.output);
    this.act2.forward(this.layer2.output);
    return this.act2.output.grid[0];
  }

  copy() {
    let newNet = new NeuralNetwork(this.i,this.h, this.o);
    newNet.layer1 = this.layer1.copy();
    newNet.act1 = this.act1.copy();
    newNet.layer2 = this.layer2.copy();
    newNet.act2 = this.act2.copy();
    return newNet;
  }

  mutate(factor) {
    this.layer1.update_weights(factor);
    this.layer1.update_biases(factor);
    this.layer2.update_weights(factor);
    this.layer2.update_biases(factor);
  }
}

var nn = new NeuralNetwork(5, 4, 2);
let output = nn.predict([0.4, 0.4, 0.6, 0.5, 0.2]);

console.log(output);
var sm_out = new Matrix([
  [0.7, 0.2, 0.1],
  [0.5, 0.1, 0.4],
  [0.02, 0.9, 0.08],
]);

var targets = new Matrix([
  [1, 0, 0],
  [0, 1, 0],
  [0, 1, 0],
]);

// var m = new Matrix(10, 10);
// m.fillInc();
// m.console();
// var inputs = new Matrix([0.5, 0.2, 0.3, 0.4, 0.2]);
// var layer = new Layer_Dense(5, 5);
// var activationSoftMax = new Activation_SoftMax();
// activationSoftMax.forward(inputs);
// logMatrix(activationSoftMax.output);
// var relu = new Activation_ReLU();
// layer.forward(inputs);
// relu.forward(layer.output);
// console.log(relu.output);

// var iterations = 100000000;

// // measure speed of function1
// var start1 = window.performance.now();
// for (var i = 0; i < iterations; i++) {
//   relu.forward(layer.output);
// }
// var end1 = window.performance.now();
// var time1 = Math.round(end1 - start1);

// // var matrix1 = new Matrix(50, 100);
// // var matrix2 = Matrix.div(new Matrix(50, 100), 2);

// // measure speed of function2
// var start2 = window.performance.now();
// for (var i = 0; i < iterations; i++) {

//   relu.forward2(layer.output);
// }
// var end2 = window.performance.now();
// var time2 = Math.round(end2 - start2);

// // output which function is faster and speed of each function
// console.log("Function1:" + time1 + "ms");
// console.log("Function2:" + time2 + "ms");

// if (time1 > time2) {
//   var result = Math.round(100 - (time2 / time1) * 100);
//   console.log("Function2 is faster than Function1 by " + result + "%");
// }

// if (time2 > time1) {
//   var result = Math.round(100 - (time1 / time2) * 100);
//   console.log("Function1 is faster than Function2 by " + result + "%");
// }
