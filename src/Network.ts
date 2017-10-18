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
    }

    get layersCount(): number {
      return this.hiddenLayers.length + 2;
    }

    public fire(inputs: number[]): number[] {
        // TODO: Fire the network and get the predicted result for this inputs
        return inputs;
    }

    public adjust(outputs: number[]): number {
        // TODO: Adjust the weight in the network, and return the current error percentage
        return 1;
    }

    public train(trainData, maxIterationsCount: number, errorThresholdValue: number) {
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

        return { iterations: currentIterationCount, error: currentErrorMargin };
    }

    public iterate(inputs: number[], outputs: number[]) {
        // blind man launches the golf ball
        this.fire(inputs);
        // you check the result and tell him to adjust
        return this.adjust(outputs);
    }

}
