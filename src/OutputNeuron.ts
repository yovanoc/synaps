import Neuron from "./Neuron";

export default class OutputNeuron extends Neuron {

    /**
     * An artificial output neuron that may be part of a layer in an artificial neural network
     *
     * @param {Layer} layer - the layer that this neuron belongs to
     * @constructor
     * @extends Neuron
     */
     constructor(layer) {
         super(layer);
     }

     /**
      * Calculates the error of this neuron from the desired output as specified
      *
      * @param {number} desiredOutput - the desired output for this neuron
      * @return {number} the error of this neuron
      */
     public calculateError(desiredOutput: number): number {
         // return the difference between the desired output and the actual output
         return desiredOutput - this.activation;
     }

     /**
      * Updates the delta of this neuron using the expected output of this neuron
      *
      * @param {number} desiredOutput - the expected output of this neuron
      */
     public updateDelta(desiredOutput: number) {
         this.delta = this.layer.activationFunction.evaluateDerivative(this.input)
         * this.calculateError(desiredOutput);
     }
}
