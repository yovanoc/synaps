import { Squash } from "./Utils/Squash";

export class Neuron {

    public static activate(sum: number) {
        return Squash.LOGISTIC(sum);
    }

    public static activateAlternative(sum: number) {
        return Squash.LOGISTIC(sum, true);
    }

    public static activateStrict(sum: number) {
        return (sum > 0) ? 1 : -1;
    }

    public inputs: Neuron[];
    public weights: number[];
    public deltaWeights: number[];

    public output: number;
    public gradient: number;

    public extraWeight: number;

    constructor(inputNeurons: Neuron[] = null, extraWeight: number = 0) {
        if (inputNeurons) {
            this.inputs = inputNeurons;
            this.weights = [];
            this.deltaWeights = [];

            this.extraWeight = extraWeight;

            for (let x = 0; x < this.inputs.length + extraWeight; x++) {
                this.weights.push(this.rand(-1, 1));
                this.deltaWeights.push(0);
            }
        }
    }

    public computeOutput() {
        let sum: number = 0;
        for (let x = 0; x < this.inputs.length; x++) {
            sum += this.inputs[x].output * this.weights[x];
        }

        for (let x = this.inputs.length; x < this.weights.length; x++) {
            sum += this.weights[x];
        }

        this.output = Neuron.activate(sum);
    }

    public computeOutputGradiant(targetValue: number) {
        const delta = targetValue - this.output;
        this.gradient = delta * Neuron.activateAlternative(this.output);
    }

    public computeHiddenGradients(outputs: Neuron[]) {
        let dow = 0.0;

        for (const output of outputs) {
            const index = output.inputs.indexOf(this);

            dow += output.weights[index] * output.gradient;
        }

        this.gradient = dow * Neuron.activateAlternative(this.output);
    }

    public train(learningRate: number = 0.3, alpha: number = 0.5) {
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

    private rand(min: number, max: number) {
        if (min < 0) {
            return min + Math.random() * (Math.abs(min) + max);
        } else {
            return min + Math.random() * max;
        }
    }
}
