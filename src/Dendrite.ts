import { Neuron } from "./Neuron";

export class Dendrite {

    public weight: number;

    private loaded: boolean;
    private neuron: Neuron;

    constructor(neuron: Neuron) {
        this.neuron = neuron;
        this.weight = Math.random();
        this.loaded = true;
    }

    public fire(inboundValue: number) {
        if (!this.loaded) {
            return;
        }

        this.loaded = false;
        const outboundValue = inboundValue * this.weight;

        this.neuron.addDendriteValue(outboundValue);
    }

    public reload() {
        this.loaded = true;
    }

}
