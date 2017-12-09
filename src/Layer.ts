import ActivationFunction from "./Activation/ActivationFunction";
import Neuron from "./Neuron";
import Prng from "./Prng";

export default class Layer {

  /**
   * The activation function that this layer uses
   *
   * @type {ActivationFunction}
   */
  public activationFunction: ActivationFunction;

  /**
   * The PRNG that this layer uses
   *
   * @type {Prng}
   */
  public prng: Prng;

  /**
   * The list of neurons in this layer
   *
   * @type {Neuron[]}
   * @private
   */
  private neurons: Neuron[] = [];

  /**
   * A layer that may be part of an artificial neural network
   *
   * @param {number} size - the number of neurons to use in this layer
   * @param {ActivationFunction} activationFunction - the activation function that this layer should use
   * @param {Prng} prng - the PRNG that this layer should use
   * @constructor
   */
  constructor(size: number, activationFunction: ActivationFunction, prng: Prng) {
    this.activationFunction = activationFunction;
    this.prng = prng;

    // create the neurons for this layer
    for (let i = 0; i < size; i++) {
      this.neurons.push(this.createNeuron());
    }

  }

  /** Propagates the output of all neurons in this layer */
  public propagateAllNeurons() {
    // for every neuron
    for (const neuron of this.neurons) {
      // propagate the neuron's activation
      neuron.propagate();
    }
  }

  /** Resets the neurons in this layer */
  public reset() {
    // for every neuron
    for (const neuron of this.neurons) {
      // reset the neuron
      neuron.reset();
    }
  }

  /**
   * Returns the number of neurons in this layer
   *
   * @return {number} the number of neurons
   */
  get size(): number {
    return this.neurons.length;
  }

  /**
   * Returns the neuron at the specified index
   *
   * @param {number} index - the neuron to return
   * @return {Neuron|OutputNeuron} the neuron
   */
  public getNeuron(index: number) {
    return this.neurons[index];
  }

  /**
   * Updates the deltas in this layer
   *
   * @param {number[]} desiredOutput - the desired output of this layer
   */
  public updateDeltas(desiredOutput?: number[]) {
    // for every neuron
    for (const neuron of this.neurons) {
      // update the delta
      neuron.updateDelta();
    }
  }

  /**
   * Updates the weights for all neurons in this layer
   *
   * @param {number} learningRate - the learning rate to use
   * @param {boolean} immediate - whether to update the weights immediately or defer the update until later
   */
  public updateWeightsInLayer(learningRate: number, immediate: boolean) {
    // for every neuron
    for (const neuron of this.neurons) {
      // update the weights
      neuron.updateWeightsAtConnections(learningRate, immediate);
    }
  }

  /** Releases all deferred weight updates */
  public releaseWeightUpdatesInLayer() {
    // for every neuron
    for (const neuron of this.neurons) {
      // release all pending weight updates
      neuron.releaseWeightUpdatesAtConnections();
    }
  }

  public toJSON() {
    const neurons = [];
    for (const neuron of this.neurons) {
      neurons.push(neuron.toJSON());
    }

    return {
      activationFunction: this.activationFunction.toJSON(),
      neurons,
    };
  }

  /**
   * Creates a new neuron for this layer
   *
   * @return {Neuron} the new neuron
   * @protected
   */
  protected createNeuron(): Neuron {
    return new Neuron(this);
  }

}
