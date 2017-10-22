import Neuron from "./Neuron";

/**
 * A connection to another neuron in an artificial neural network
 *
 * @constructor
 * @param {Neuron} targetNeuron - the neuron that is the target of this connection
 * @param {number} initialWeight - the initial weight of this connection
 */
export default class Connection {

    /**
     * The neuron that is the target of this connection
     *
     * @type {Neuron}
     */
    public targetNeuron: Neuron;

    /**
     * The current weight of this connection
     *
     * @type {number}
     */
    public weight: number;

    /**
     * Accumulates all weight updates that are deferred until later
     *
     * @type {number}
     * @private
     */
    private weightUpdatePending: number = 0;

    constructor(targetNeuron: Neuron, initialWeight: number) {
        this.targetNeuron = targetNeuron;
        this.weight = initialWeight;
    }

    /**
     * Increases the current weight of this connection by the specified value
     *
     * @param {number} addend - the value to increase this weight by
     * @param {boolean} immediate - whether to update the weights immediately or defer the update until later
     */
    public updateWeight(addend: number, immediate: boolean) {
        if (immediate) {
            this.weight += addend;
        } else {
            this.weightUpdatePending += addend;
        }
    }

    /** Releases all deferred weight updates */
    public releaseWeightUpdates() {
        // update the weights with the deferred changes
        this.weight += this.weightUpdatePending;
        // reset the accumulated changes
        this.weightUpdatePending = 0;
    }

    /**
     * Returns the delta of this connection's target neuron scaled by this connection's weight
     *
     * @return {number} the weighted delta
     */
    get weightedDelta(): number {
        return this.targetNeuron.delta * this.weight;
    }

    public toJSON() {
        return {
            weight: this.weight,
        };
    }
}
