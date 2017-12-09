import math from './Math';

export default class Neuron {
  constructor(numberInputs) {
    this.weights = new Array(numberInputs);
    this.bias = math.rand();

    for (let i = 0; i < this.weights.length; i++) {
      this.weights[i] = math.rand();
    }
  }

  process(inputs) {
    this.lastInputs = inputs;

    let sum = 0;

    for (let i = 0; i < inputs.length; i++) {
      sum += inputs[i] * this.weights[i];
    }

    sum += this.bias;
    return this.lastOutput = math.sigmoid(sum);
  }
}
