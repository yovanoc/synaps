import { Network } from "../src/Network";

import * as chai from "chai";
import * as mocha from "mocha";

const expect = chai.expect;

describe("Network", () => {

  it("should be able to create a Network class correctly" , () => {
      const network = new Network(2, [2], 1);
  });

  it("should have correct layers count in the network" , () => {
      const network = new Network(2, [2], 1);
      expect(network.layersCount).to.equal(3);
      const network2 = new Network(2, [2, 3, 2], 1);
      expect(network2.layersCount).to.equal(5);
  });
});
