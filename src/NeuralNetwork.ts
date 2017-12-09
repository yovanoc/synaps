import HyperbolicTangent from "./Activation/HyperbolicTangent";
import Identity from "./Activation/Identity";
import INeuralNetworkOptions from "./INeuralNetworkOptions";
import Layer from "./Layer";
import OutputLayer from "./OutputLayer";
import Prng from "./Prng";

export default abstract class NeuralNetwork {

  /**
   * The seed of this network (if any)
   *
   * @type {number|undefined}
   * @private
   */
  private seed: number = 374923;

  /**
   * The layers that this network consists of
   *
   * @type {Layer[]|OutputLayer[]}
   * @private
   */
  private layers = [];

  /**
   * The current learning rate of this network
   *
   * @type {number}
   * @private
   */
  private learningRate: number = 0.3;

  /**
   * Artificial neural network
   *
   * Neural networks take some input and try to predict the desired output
   *
   * A network can be applied to function approximation, regression analysis, classification, data processing, etc.
   *
   * When there is no hidden layer, this is called a "single-layer network",
   * since the input layer is usually not counted
   *
   * More hidden layers allow for solutions to more complex problems,
   * but such networks may be harder to manage and train
   *
   * If you don't know where to start, try a 2-layer or 3-layer neural network first (i.e. 1 or 2 hidden layers)
   *
   * When there are lots of hidden layers, e.g. 10 to 20,
   * it's called "deep learning", but that may not be what you need
   *
   * The "knowledge" (or learned behavior) of a network is stored in its weights
   *
   * The response of a network is not generally analyzable so that a lot of trial and error may be required
   *
   * Parameters that can be experimented with are hidden layer depth and size and choice of activation function
   *
   * While universal approximators in theory, there is no guarantee of convergence for neural networks in practice
   *
   * @param {number} inputNeurons - the number of neurons to use in the input layer
   * @param {number[]} hiddenNeurons - the number of neurons to use per hidden layer
   * @param {number} outputNeurons - the number of neurons to use in the output layer
   * @param {INeuralNetworkOptions} [options]
   * @param {number} [options.seed] - the seed to use for deterministic results
   * @param {number} [options.learningRate] - the learning rate to use
   * @param {ActivationFunction} [options.hiddenLayerActivationFunction]
   * - the activation function for the hidden layer
   * @param {ActivationFunction} [options.outputLayerActivationFunction]
   * - the activation function for the output layer
   * @constructor
   */
  constructor(inputNeurons: number, hiddenNeurons: number[], outputNeurons: number, options?: INeuralNetworkOptions) {
    let hiddenLayerActivationFunction = new HyperbolicTangent();
    let outputLayerActivationFunction = new HyperbolicTangent();

    if (options) {
      this.seed = options.seed;
      this.learningRate = options.learningRate;
      hiddenLayerActivationFunction = options.hiddenLayerActivationFunction;
      outputLayerActivationFunction = options.outputLayerActivationFunction;
    }

    const prng = new Prng(this.seed);
    // add the input layer
    this.layers.push(new Layer(inputNeurons, new Identity(), prng));
    // add the hidden layers
    for (const hiddenNeuron of hiddenNeurons) {
      this.layers.push(new Layer(hiddenNeuron, hiddenLayerActivationFunction, prng));
    }
    // add the output layer
    this.layers.push(new OutputLayer(outputNeurons, outputLayerActivationFunction, prng));
  }

  /**
   * Tries to predict the output from the specified input
   *
   * @param {number[]} input - the input to process
   * @return {number[]} the output predicted by this network
   */
  public predict(input) {
    this._feed(input);
    return this._getOutput();
  }

  /**
   * Trains the network using supervised online ("single-pattern") learning (as opposed to batch learning)
   * Use online learning to supply individual training examples at a time
   * All subsequent training examples will thus be run on a network that has already updated by changings its weights
   * This is useful when data becomes available in a sequential order and is not available all at once
   * The technique may also be used when train on the entire dataset is computationally too expensive
   *
   * @param {number[]} input - the input for an individual training example
   * @param {number[]} desiredOutput - the expected output for an individual training example
   * @return {number} the mean squared error
   */
  public train(input: number[], desiredOutput: number[]): number {
    // feed the training input into the network
    this._feed(input);
    // calculate and propagate back the errors from the output layer
    this._backpropagate(desiredOutput);
    // calculate the sum-squared error
    const sumSquaredError = this.outputLayer.calculateSumSquaredError(desiredOutput);
    // update the weights in this network
    this._updateWeightsInNetwork(true);
    // return the mean squared error
    return sumSquaredError / this.outputLayer.size;
  }

  /**
   * Trains the network using supervised batch ("all-at-once") learning (as opposed to online learning)
   * Use batch learning to supply multiple training examples (i.e. the entire dataset) at once
   * All training examples will be run on a network with the same weights per iteration
   * This is the recommended technique if all training data is available apriori and it's computationally feasible
   *
   * @param {number[][]} inputs - the inputs per training example
   * @param {number[][]} desiredOutputs - the expected outputs per training example
   * @param {number} [iterations] - the maximum number of iterations to train
   * @param {number} [errorThreshold]
   * - the desired error threshold that will cause training to be finished when reached
   * @return {number} the mean squared error
   */
  public trainBatch(inputs: number[][], desiredOutputs: number[][],
                    iterations: number = 1, errorThreshold: number = 0.005) {
    if (inputs.length !== desiredOutputs.length) {
      throw new Error(`Number of input patterns (\`${inputs.length}\`)` +
        ` and output patterns (\`${desiredOutputs.length}\`) must match`);
    }
    const start = new Date().getTime();
    let actualIteration = 0;
    const outputLayerSize = this.outputLayer.size;
    let error = Number.POSITIVE_INFINITY;
    // until the maximum number of iterations or the desired error
    // threshold has been reached (whichever comes first)
    for (let i = 1; i <= iterations && error > errorThreshold; i++) {
      // reset the accumulated error
      error = 0;
      // for every training pattern
      for (let k = 0; k < inputs.length; k++) {
        // feed the training input into the network
        this._feed(inputs[k]);
        // calculate and propagate back the errors from the output layer
        this._backpropagate(desiredOutputs[k]);
        // update the weights in this network
        this._updateWeightsInNetwork(false);
        // accumulate the error
        error += this.outputLayer.calculateSumSquaredError(desiredOutputs[k]);
      }
      // turn the total sum-squared error into the mean squared error
      error /= inputs.length * outputLayerSize;
      this._releaseWeightUpdatesInNetwork();
      // FIXME: Tweak for getting right iterations count
      actualIteration = i;
    }
    const end = new Date().getTime();
    return { error, iterations: actualIteration, time: end - start };
  }

  /** Resets the layers in this network */
  public reset() {
    // for every layer
    for (const layer of this.layers) {
      // reset the layer
      layer.reset();
    }
  }

  /**
   * Returns the number of layers in this network
   *
   * @return {Number} the number of layers
   */
  get numberOfLayers() {
    return this.layers.length;
  }

  /**
   * Returns the layer at the specified index
   *
   * @param {number} index - the layer to return
   * @return {Layer|OutputLayer}
   */
  public getLayer(index) {
    return this.layers[index];
  }

  /**
   * Returns the input layer for this network
   *
   * @return {Layer} the input layer
   */
  get inputLayer() {
    return this.getLayer(0);
  }

  /**
   * Returns the output layer for this network
   *
   * @return {OutputLayer} the output layer
   */
  get outputLayer() {
    return this.getLayer(this.layers.length - 1);
  }

  public toJSON() {
    const layers = [];
    for (const layer of this.layers) {
      layers.push(layer.toJSON());
    }

    return {
      layers,
      learningRate: this.learningRate,
      seed: this.seed,
    };
  }

  /**
   * Feeds the specified input into the network
   *
   * @param {number[]} input - the input to process
   * @protected
   * @abstract
   */
  protected abstract _feed(input: number[]);

  /**
   * Returns the network's output for the previously supplied input
   *
   * @return {number[]} the network's output
   * @private
   */
  private _getOutput(): number[] {
    const outputLayerSize = this.outputLayer.size;

    const output = [];

    for (let i = 0; i < outputLayerSize; i++) {
      output.push(this.outputLayer.getNeuron(i).activation);
    }

    return output;
  }

  /**
   * Uses backpropagation to update deltas in all layers starting with the output layer
   *
   * @param {number[]} desiredOutput - the expected output
   * @private
   */
  private _backpropagate(desiredOutput) {
    // update the deltas in the output layer
    this.outputLayer.updateDeltas(desiredOutput);

    // for all hidden layers (in reverse order)
    for (let layerIndex = this.layers.length - 2; layerIndex > 0; layerIndex--) {
      // update the deltas
      this.getLayer(layerIndex).updateDeltas();
    }
  }

  /**
   * Updates the weights for all layers in this network
   *
   * @param {boolean} immediate - whether to update the weights immediately or defer the update until later
   * @private
   */
  private _updateWeightsInNetwork(immediate: boolean) {
    // for the input layer and all hidden layers
    for (const layer of this.layers) {
      // update the weights
      layer.updateWeightsInLayer(this.learningRate, immediate);
    }
  }

  /**
   * Releases all deferred weight updates
   *
   * @private
   */
  private _releaseWeightUpdatesInNetwork() {
    // for the input layer and all hidden layers
    for (const layer of this.layers) {
      // release all pending weight updates
      layer.releaseWeightUpdatesInLayer();
    }
  }

}
