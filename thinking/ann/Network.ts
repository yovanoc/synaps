import { Neuron } from "./Neuron";

export class Network {
    public layers: Neuron[][];

    constructor(neuronPerLayer: number[], extraWeight: boolean) {
        this.layers = [];

        for (const neuronCount in neuronPerLayer) {
            if (neuronPerLayer.hasOwnProperty(neuronCount)) {
                const previousLayer = this.outputLayer;

                this.layers.push([]);

                for (let x = 0; x < neuronPerLayer[neuronCount]; x++) {
                    this.outputLayer.push(new Neuron(previousLayer, extraWeight ? 1 : 0));
                }
            }
        }
    }

    get inputLayer() {
        if (this.layers) {
            return this.layers[0];
        } else {
            return [];
        }
    }

    get outputLayer() {
        if (this.layers) {
            return this.layers[this.layers.length - 1];
        } else {
            return [];
        }
    }

    public getLayer(layerIndex: number) {
        return this.layers[layerIndex];
    }

    public getLayerSize(layerIndex: number) {
        return this.getLayer(layerIndex).length;
    }

    get layerCount() {
        return this.layers.length;
    }

    public getNeuron(layerIndex: number, neuronIndex: number) {
        return this.layers[layerIndex][neuronIndex];
    }

    public activate(inputs: number[]) {
        for (const x in this.getLayer(0)) {
            if (this.getLayer(0).hasOwnProperty(x)) {
                this.getNeuron(0, +x).output = inputs[x];
            }
        }

        for (const x in this.layers) {
            if (x === "0") {
                continue;
            }

            for (const n of this.getLayer(+x)) {
                n.computeOutput();
            }
        }

        const output: number[] = [];

        for (const n of this.outputLayer) {
            output.push(n.output);
        }

        return output;
    }

    public train(targetOutput: number[]) {
        for (const x in this.outputLayer) {
            if (this.outputLayer.hasOwnProperty(x)) {
                this.outputLayer[x].computeOutputGradiant(targetOutput[x]);
            }
        }

        for (let x = this.layerCount - 2; x > 0; x--) {
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
