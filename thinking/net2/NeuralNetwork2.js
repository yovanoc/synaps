class NeuralNetwork2 {
  constructor(neuronPerLayer, extraWeight = true) {
    this.layers = [];

    for (const neuronCount in neuronPerLayer) {
      const previousLayer = this.getOutputLayer();

      this.layers.push([]);

      for (let x = 0; x < neuronPerLayer[neuronCount]; x++) {
        this.getOutputLayer().push(new Neuron(previousLayer, extraWeight ? 1 : 0));
      }
    }
  }

  getInputLayer() {
    if (this.layers) {
      return this.layers[0];
    } else {
      return [];
    }
  }

  getOutputLayer() {
    if (this.layers) {
      return this.layers[this.layers.length - 1];
    } else {
      return [];
    }
  }

  getLayer(layerIndex) {
    return this.layers[layerIndex];
  }

  getLayerSize(layerIndex) {
    return this.getLayer(layerIndex).length;
  }

  getLayerCount() {
    return this.layers.length;
  }

  getNeuron(layerIndex, neuronIndex) {
    return this.layers[layerIndex][neuronIndex];
  }

  activate(inputs) {
    for (const x in this.getLayer(0)) {
        this.getNeuron(0, +x).output = inputs[x];
    }

    for (const x in this.layers) {
      if (x === "0") {
        continue;
      }

      for (const n of this.getLayer(+x)) {
        n.computeOutput();
      }
    }

    const output = [];

    for (const n of this.getOutputLayer()) {
      output.push(n.output);
    }

    return output;
  }

  train(targetOutput) {
    for (const x in this.getOutputLayer()) {
      this.getOutputLayer()[x].computeOutputGradient(targetOutput[x]);
    }

    for (let x = this.getLayerCount() - 2; x > 0; x--) {
      for (const n of this.getLayer(x)) {
        n.computeHiddenGradients(this.getLayer(x + 1));
      }
    }

    for (const x in this.layers) {
      if (x === "0") {
        continue;
      }

      for (const n of this.getLayer(+x)) {
        n.train();
      }
    }
  }
}
