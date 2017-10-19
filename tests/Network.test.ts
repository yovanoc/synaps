import { Network, XORTrainData } from "../src";

import * as chai from "chai";
import * as mocha from "mocha";

const expect = chai.expect;

let network: Network;

describe("Network", () => {

  it("should be able to create a Network class correctly" , () => {
      network = new Network(2, [2], 1);
  });

  it("should have correct layers count in the network" , () => {
      expect(network.layersCount).to.equal(3);
      const network2 = new Network(2, [2, 3, 2], 1);
      expect(network2.layersCount).to.equal(5);
  });

  it("should train correctly" , () => {
      network.train(XORTrainData.generate(200), 1000, 0.005);
  });

  it("should fire correctly" , () => {
      network.fire([1, 0]);
  });
});
