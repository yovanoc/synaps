import ActivationFunction from "./Activation/ActivationFunction";

export default interface INeuralNetworkOptions {
  seed: number;
  learningRate: number;
  hiddenLayerActivationFunction: ActivationFunction;
  outputLayerActivationFunction: ActivationFunction;
}
