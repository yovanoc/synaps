import { Dendrite } from "./Dendrite";
import { NeuronLayer } from "./NeuronLayer";

export class InputLayer extends NeuronLayer {

  constructor(neuronCount: number) {
    super(neuronCount);

    for (const neuron of this.neurons) {
      neuron.addInboundDendrite(new Dendrite(neuron));
    }
  }

  get dendrites(): Dendrite[] {
    let allDendrites = [];

    for (const neuron of this.neurons) {
      allDendrites = allDendrites.concat(neuron.inboundDendrites);
    }

    return allDendrites;
  }

  public fire(inputValues: number[]) {
    // make sure that the input value count matches the dendrite count
    if (this.dendrites.length !== inputValues.length) {
      throw new Error("InputLayer: invalid input value array");
    }

    for (let i = 0; i < this.dendrites.length; i++) {
      const dendrite = this.dendrites[i];
      const inputValue = inputValues[i];

      dendrite.fire(inputValue);
    }
  }

}
