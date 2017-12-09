import { Dendrite } from "./Dendrite";
import { Neuron } from "./Neuron";

export class NeuronLayer {

  public neurons: Neuron[];

  private neuronCount: number;

  constructor(neuronCount: number) {
    this.neuronCount = neuronCount;
    this.neurons = [];

    for (let i = 0; i < this.neuronCount; i++) {
      this.neurons.push(new Neuron());
    }
  }

  // public createNextLayer(neuronCount: number): NeuronLayer {
  //     const newLayer = new NeuronLayer(neuronCount);
  //
  //     newLayer.injectInputNeurons(this.neurons);
  //     return newLayer;
  // }

  public injectInputNeurons(inputNeurons: Neuron[]) {
    for (const neuron of this.neurons) {
      neuron.injectInputNeurons(inputNeurons);
    }
  }

}
