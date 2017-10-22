import Connection from "./Connection";
import Layer from "./Layer";

export default class Neuron {

    public static preDefinedWeights = [];

    /**
     * The current input of this neuron
     *
     * @type {number}
     */
    public input: number = 0;

    /**
     * The current activation of this neuron
     *
     * @type {number}
     */
    public activation: number = 0;

    /**
     * The current error of this neuron scaled by the confidence it showed in predicting its output
     *
     * @type {number}
     */
    public delta: number = 0;

    /**
     * The layer that this neuron belongs to
     *
     * @type {Layer}
     */
    public layer: Layer;

    /**
     * The list of outgoing connections from this neuron
     *
     * @type {Connection[]}
     * @private
     */
    private connections: Connection[] = [];

    /**
     * An artificial neuron that may be part of a layer in an artificial neural network
     *
     * @param {Layer} layer - the layer that this neuron belongs to
     * @constructor
     */
    constructor(layer: Layer) {
        this.layer = layer;
    }

    /**
     * Returns the outgoing connection at the specified index
     *
     * @param {number} index - the connection to return
     * @return {Connection} the connection
     */
    public getConnection(index: number): Connection {
        return this.connections[index];
    }

    /** Resets this neuron */
    public reset() {
        this.input = 0;
        this.activation = 0;
    }

    /** Propagates the activation from this neuron to the connected neurons */
    public propagate() {
        // determine this neuron's activation
        this.activation = this.layer.activationFunction.evaluate(this.input);

        // for every connection from this neuron
        for (const connection of this.connections) {
            connection.targetNeuron.feed(this.activation * connection.weight);
        }
    }

    /**
     * Feeds the specified value into this neuron
     *
     * @param {number} value - the value to add to this neuron's input
     */
    public feed(value: number) {
        this.input += value;
    }

    /**
     * Adds a new connection to the other neuron that is specified
     *
     * @param {Neuron} targetNeuron - the other neuron to connect to
     */
    public connectTo(targetNeuron: Neuron) {
        let initialWeight;
        if (Neuron.preDefinedWeights.length) {
            // use the next pre-defined weight
            initialWeight = Neuron.preDefinedWeights.pop();
        } else {
            // initialize the weight randomly with a mean of zero
            initialWeight = this.layer.prng.getRandomFloat(0, 0.3) - 0.15;
        }
        this.connections.push(new Connection(targetNeuron, initialWeight));
    }

    /**
     * Updates all weights for this neuron
     *
     * @param {number} learningRate - the learning rate to use
     * @param {boolean} immediate - whether to update the weights immediately or defer the update until later
     */
    public updateWeightsAtConnections(learningRate: number, immediate: boolean) {
        let update;

        // for every connection
        for (const connection of this.connections) {
            // calculate the product of the learning rate and the negative gradient
            update = learningRate * connection.targetNeuron.delta * this.activation;
            // update the weight to move in the direction of a minimum of the error function
            connection.updateWeight(update, immediate);
        }
    }

    /** Releases all deferred weight updates */
    public releaseWeightUpdatesAtConnections() {
        // for every connection
        for (const connection of this.connections) {
            // release all pending weight updates
            connection.releaseWeightUpdates();
        }
    }

    public toJSON() {
        const connections = [];
        for (const connection of this.connections) {
            connections.push(connection.toJSON());
        }

        return { connections };
    }

    /**
     * Calculates the error of this neuron from the desired output as specified
     *
     * @param {number} desiredOutput - the desired output for this neuron
     * @return {number} the error of this neuron
     */
    public calculateError(desiredOutput?: number): number {
        let error = 0;

        // for every connection
        for (const connection of this.connections) {
            // accumulate the error by adding the weighted delta from the connection
            error += connection.weightedDelta;
        }

        // return the accumulated error
        return error;
    }

    /**
     * Updates the delta of this neuron using the expected output of this neuron
     *
     * @param {number} desiredOutput - the expected output of this neuron
     */
    public updateDelta(desiredOutput?: number) {
        this.delta = this.layer.activationFunction.evaluateDerivative(this.input) * this.calculateError();
    }

}
