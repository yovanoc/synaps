import HyperbolicTangent from "../src/Activation/HyperbolicTangent";
import FeedForwardNeuralNetwork from "../src/FeedForwardNeuralNetwork";

import * as chai from "chai";
import * as mocha from "mocha";

const expect = chai.expect;

let network: FeedForwardNeuralNetwork;

describe("FeedForwardNeuralNetwork", () => {

  it("should be able to create a Network class correctly", () => {
    network = new FeedForwardNeuralNetwork(2, [3], 1, {
      hiddenLayerActivationFunction: new HyperbolicTangent(),
      learningRate: 0.3,
      outputLayerActivationFunction: new HyperbolicTangent(),
      seed: 837265,
    });
  });

});
