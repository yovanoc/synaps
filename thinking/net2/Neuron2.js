class Neuron2 {
  static activate(sum) {
    // return Math.tanh(sum);
    return Neuron2.sigmoid(sum)
  }

  static activateAlternative(sum) {
    // return 1.0 - Math.tanh(sum) * Math.tanh(sum);
    return Neuron2.dsigmoid(sum)
  }

  static activateStrict(sum) {
    return (sum > 0) ? 1 : -1;
  }

  constructor(inputNeurons = null, extraWeight = 0) {
    if (inputNeurons) {
      this.inputs = inputNeurons;
      this.weights = [];
      this.deltaWeights = [];

      this.extraWeight = extraWeight;

      for (let x = 0; x < this.inputs.length + extraWeight; x++) {
        this.weights.push(getRandom(-1, 1));
        this.deltaWeights.push(0);
      }
    }
  }


  computeOutput() {
    let sum = 0;
    for (let x = 0; x < this.inputs.length; x++) {
      sum += this.inputs[x].output * this.weights[x];
    }

    for (let x = this.inputs.length; x < this.weights.length; x++) {
      sum += this.weights[x];
    }

    this.output = Neuron2.activate(sum);
  }

  computeOutputGradient(targetValue) {
    const delta = targetValue - this.output;
    this.gradient = delta * Neuron2.activateAlternative(this.output);
  }

  computeHiddenGradients(outputs) {
    let dow = 0.0;

    for (const x in outputs) {
        const index = outputs[x].inputs.indexOf(this);

        dow += outputs[x].weights[index] * outputs[x].gradient;
    }

    this.gradient = dow * Neuron2.activateAlternative(this.output);
  }

  train(learningRate = 0.3, alpha = 0.5) {
    for (let x = 0; x < this.weights.length; x++) {
      const oldDeltaWeight = this.deltaWeights[x];
      const newDeltaWeight =
      // Individual input, magnified by the gradient and train rate:
      learningRate
      * (x < this.inputs.length ? this.inputs[x].output : 1)
      * this.gradient
      // Also add momentum = a fraction of the previous delta weight
      + alpha
      * oldDeltaWeight;

      this.deltaWeights[x] = newDeltaWeight;
      this.weights[x] += newDeltaWeight;
    }
  }
}

Neuron2.sigmoid = x => 1 / (1 + Math.pow(Math.E, -x))

Neuron2.dsigmoid = x => x * (1 - x)

Neuron2.tanh = x => Math.tanh(x)

Neuron2.dtanh = x => 1 / (Math.pow(Math.cosh(x), 2))
