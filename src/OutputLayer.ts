import ActivationFunction from "./Activation/ActivationFunction";
import Layer from "./Layer";
import OutputNeuron from "./OutputNeuron";
import Prng from "./Prng";

export default class OutputLayer extends Layer {

  /**
   * An output layer that may be part of an artificial neural network
   *
   * @param {number} size - the number of neurons to use in this layer
   * @param {ActivationFunction} activationFunction - the activation function that this layer should use
   * @param {Prng} prng - the PRNG that this layer should use
   * @constructor
   * @extends Layer
   */
  constructor(size: number, activationFunction: ActivationFunction, prng: Prng) {
    // call the super class's constructor
    super(size, activationFunction, prng);
  }

  /**
   * Updates the deltas in this layer
   *
   * @param {number[]} desiredOutput - the desired output of this layer
   */
  public updateDeltas(desiredOutput: number[]) {
    if (desiredOutput.length !== this.size) {
      throw new Error(`Size of desired output (\`${desiredOutput.length}\`)` +
        ` and number of output neurons (\`${this.size}\`) must match`);
    }

    // for every neuron
    for (let i = 0; i < this.size; i++) {
      // update the delta
      this.getNeuron(i).updateDelta(desiredOutput[i]);
    }
  }

  /**
   * Calculates the sum of the squares of all errors in this layer
   *
   * @param {number[]} desiredOutput - the desired output of this layer
   * @return {number} the sum-squared error of this layer
   */
  public calculateSumSquaredError(desiredOutput: number[]): number {
    // get the number of output neurons
    const numOutputs = this.size;

    // prepare a variable to accumulate the squared errors
    let squaredErrors = 0;

    let error;

    // for each output neuron
    for (let i = 0; i < numOutputs; i++) {
      // calculate the error of the individual neuron
      error = this.getNeuron(i).calculateError(desiredOutput[i]);
      // add the square of the individual error to the sum
      squaredErrors += error ** 2;
    }
    // return the sum-squared error
    return squaredErrors;
  }

  /**
   * Creates a new neuron for this layer
   *
   * @return {Neuron} the new neuron
   * @protected
   */
  protected createNeuron(): OutputNeuron {
    return new OutputNeuron(this);
  }

}
