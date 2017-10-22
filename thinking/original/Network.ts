import { HiddenLayer } from "./HiddenLayer";
import { InputLayer } from "./InputLayer";
import { OutputLayer } from "./OutputLayer";

export class Network {

    public inputLayer: InputLayer;
    public outputLayer: OutputLayer;
    public hiddenLayers: HiddenLayer[];

    constructor(inputNeuronCount: number, hiddenLayerNeuronCounts: number[], outputLayerNeuronCount: number) {
        this.inputLayer = new InputLayer(inputNeuronCount);
        this.outputLayer = new OutputLayer(outputLayerNeuronCount);
        this.hiddenLayers = [];

        for (const hiddenLayerNeuronCount of hiddenLayerNeuronCounts) {
            const hiddenLayer = new HiddenLayer(hiddenLayerNeuronCount);

            this.hiddenLayers.push(hiddenLayer);
        }

        // connecting layers
        this.hiddenLayers[0].injectInputNeurons(this.inputLayer.neurons);
        for (let i = 1; i < this.hiddenLayers.length - 1; i++) {
            this.hiddenLayers[i].injectInputNeurons(this.hiddenLayers[i - 1].neurons);
        }
        this.outputLayer.injectInputNeurons(this.hiddenLayers[this.hiddenLayers.length - 1].neurons);
    }

    get layersCount(): number {
        return this.hiddenLayers.length + 2;
    }

    public fire(inputs: number[]): number[] {
        // TODO: Fire the network and get the predicted result for this inputs
        this.inputLayer.fire(inputs);
        return inputs;
    }

    public adjust(outputs: number[]): number {
        // TODO: Adjust the weight in the network, and return the current error percentage
        return 1;
    }

    public train(trainData, maxIterationsCount: number, errorThresholdValue: number) {
        const start = new Date().getTime();
        let currentIterationCount = 0;
        let currentErrorMargin = 1.0;

        while (currentErrorMargin > errorThresholdValue) {
            // stop when enough is enough
            if (currentIterationCount === maxIterationsCount) {
                break;
            }
            // stop when there is no entries left in the train data
            if (trainData.length === 0) {
                 break;
            }
            // we take the next example from the traindata stack.
            const pattern = trainData.shift();
            const inputs = pattern[0];
            const outputs = pattern[1];

            currentErrorMargin = this.iterate(inputs, outputs);
            currentIterationCount++;
        }
        const end = new Date().getTime();
        return { iterations: currentIterationCount, error: currentErrorMargin, time: (end - start) };
    }

    public iterate(inputs: number[], outputs: number[]): number {
        // get the predicted results for this inputs
        this.fire(inputs);
        // you check the results and tell him to adjust
        return this.adjust(outputs);
    }

}
