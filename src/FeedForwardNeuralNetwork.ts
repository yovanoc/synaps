import ArcTangent from "./Activation/ArcTangent";
import BinaryStep from "./Activation/BinaryStep";
import GaussianFunction from "./Activation/GaussianFunction";
import HyperbolicTangent from "./Activation/HyperbolicTangent";
import Identity from "./Activation/Identity";
import LogisticFunction from "./Activation/LogisticFunction";
import RectifiedLinearUnit from "./Activation/RectifiedLinearUnit";
import SinusoidFunction from "./Activation/SinusoidFunction";
import INeuralNetworkOptions from "./INeuralNetworkOptions";
import NeuralNetwork from "./NeuralNetwork";
import Neuron from "./Neuron";

export default class FeedForwardNeuralNetwork extends NeuralNetwork {

  /**
   * Restores a neural network instance from the supplied JSON string
   *
   * @param {string} jsonString - the JSON string to restore from
   * @return {FeedForwardNeuralNetwork} the restored network instance
   */
  public static fromJson(jsonString: string): FeedForwardNeuralNetwork {
    function flattenArray(arr) {
      return arr.reduce((a, b) => a.concat(b), []);
    }

    function createWeightsListFromLayer(layerObj) {
      return flattenArray(layerObj.neurons.map((each) => each.connections.map((each2) => each2.weight)));
    }

    function createActivationFunctionFromName(name: string) {
      switch (name) {
        case "ArcTangent":
          return new ArcTangent();
        case "BinaryStep":
          return new BinaryStep();
        case "GaussianFunction":
          return new GaussianFunction();
        case "HyperbolicTangent":
          return new HyperbolicTangent();
        case "Identity":
          return new Identity();
        case "LogisticFunction":
          return new LogisticFunction();
        case "RectifiedLinearUnit":
          return new RectifiedLinearUnit();
        case "SinusoidFunction":
          return new SinusoidFunction();
        default:
          throw new Error(`Undefined activation function \`${name}\``);
      }
    }

    const data = JSON.parse(jsonString);

    const inputLayer = data.layers.shift();
    const outputLayer = data.layers.pop();
    const hiddenLayers = data.layers;

    const inputNeurons = inputLayer.neurons.length;
    const hiddenNeurons = hiddenLayers.map((each) => each.neurons.length);
    const outputNeurons = outputLayer.neurons.length;

    const inputWeights = createWeightsListFromLayer(inputLayer);
    const outputWeights = createWeightsListFromLayer(outputLayer);

    let hiddenWeights = [];
    for (const hiddenLayer of hiddenLayers) {
      hiddenWeights.push(createWeightsListFromLayer(hiddenLayer));
    }
    hiddenWeights = flattenArray(hiddenWeights);

    const allWeights = inputWeights.concat(hiddenWeights, outputWeights);

    const hiddenLayerActivationFunction = (hiddenLayers.length > 0)
      ? hiddenLayers[0].activationFunction : "Identity";

    Neuron.preDefinedWeights = allWeights;

    return new FeedForwardNeuralNetwork(inputNeurons, hiddenNeurons, outputNeurons, {
      hiddenLayerActivationFunction: createActivationFunctionFromName(hiddenLayerActivationFunction),
      learningRate: data.learningRate,
      outputLayerActivationFunction: createActivationFunctionFromName(outputLayer.activationFunction),
      seed: data.seed,
    });
  }

  /**
   * Artificial feedforward neural network using a directed acyclic graph as its graph
   *
   * All information travels only forward,
   * i.e. from the input nodes, through the optional hidden nodes, to the output nodes
   *
   * @param {number} inputNeurons - the number of neurons to use in the input layer
   * @param {number[]} hiddenNeurons - the number of neurons to use per hidden layer
   * @param {number} outputNeurons - the number of neurons to use in the output layer
   * @param {Object} [options]
   * @param {number} [options.seed] - the seed to use for deterministic results
   * @param {number} [options.learningRate] - the learning rate to use
   * @param {ActivationFunction} [options.hiddenLayerActivationFunction]
   * - the activation function for the hidden layer
   * @param {ActivationFunction} [options.outputLayerActivationFunction]
   * - the activation function for the output layer
   * @constructor
   * @extends NeuralNetwork
   */
  constructor(inputNeurons: number, hiddenNeurons: number[], outputNeurons: number, options?: INeuralNetworkOptions) {
    super(inputNeurons, hiddenNeurons, outputNeurons, options);
    this._createConnections();
  }

  /**
   * Feeds the specified input into the network
   *
   * @param {number[]} input - the input to process
   * @protected
   */
  protected _feed(input: number[]) {
    // prepare the network for the new input
    this.reset();
    // validate the size of the supplied input
    if (input.length !== this.inputLayer.size) {
      throw new Error(`Size of input layer (\`${this.inputLayer.size}\`)` +
        ` and supplied input (\`${input.length}\`) must match`);
    }

    let neuron;

    // for every neuron in the input layer
    for (let i = 0; i < this.inputLayer.size; i++) {
      neuron = this.inputLayer.getNeuron(i);
      // feed the input into the neuron
      neuron.feed(input[i]);
    }

    // for every layer
    for (let k = 0; k < this.numberOfLayers; k++) {
      // propagate the activation
      this.getLayer(k).propagateAllNeurons();
    }
  }

  /**
   * Creates the connections between the layers of this network so that they represent a fully-connected network
   *
   * @private
   */
  private _createConnections() {
    let previousLayer;
    let previousLayerSize;
    let currentLayer;
    let currentLayerSize;

    // for every layer except for the input layer
    for (let i = 1; i < this.numberOfLayers; i++) {
      previousLayer = this.getLayer(i - 1);
      previousLayerSize = previousLayer.size;
      currentLayer = this.getLayer(i);
      currentLayerSize = currentLayer.size;

      // for every neuron in the previous layer
      for (let k = 0; k < previousLayerSize; k++) {
        // for every neuron in the current layer
        for (let m = 0; m < currentLayerSize; m++) {
          // connect the previous layer's neuron to the current layer's neuron
          previousLayer.getNeuron(k).connectTo(currentLayer.getNeuron(m));
        }
      }
    }
  }

}
