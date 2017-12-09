import Neuron from './Neuron';

export default class Layer {
  constructor(numNeurons, numInputs) {
    this.neurons = new Array(numNeurons);

    for (let i = 0; i < this.neurons.length; i++) {
      this.neurons[i] = new Neuron(numInputs);
    }
  }

  process(inputs) {
    return this.neurons.map(neuron => neuron.process(inputs));
  }
}
