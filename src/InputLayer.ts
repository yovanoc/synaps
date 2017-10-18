import { Dendrite } from "./Dendrite";
import { NeuronLayer } from "./NeuronLayer";

export class InputLayer extends NeuronLayer {

    constructor(neuronCount: number) {
        super(neuronCount);
    }

    get dendrites(): Dendrite[] {
        let allDendrites = [];

        for (const neuron of this.neurons) {
            const dendrites = neuron.inboundDendrites;

            allDendrites = allDendrites.concat(dendrites);
        }

        return allDendrites;
    }

    public fire(inputValues: number[]) {
        // make sure that the input value count matches the dendrite count
        if (this.dendrites.length !== inputValues.length) {
            throw new Error("NeuronLayer: invalid input value array");
        }

        for (let i = 0; i < this.dendrites.length; i++) {
            const dendrite = this.dendrites[i];
            const inputValue = inputValues[i];

            dendrite.fire(inputValue);
        }
    }

}
