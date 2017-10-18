import { XORTrainData } from "../src/XORTrainData";

import * as chai from "chai";
import * as mocha from "mocha";

const expect = chai.expect;

describe("XORTrainData", () => {

  it("should be able to random 0 or 1" , () => {
      const random = XORTrainData.getRandomZeroOrOne();

      expect(random).to.satisfy((num) => {
          if ((num === 0) || (num === 1)) {
              return true;
          } else {
              return false;
          }
      });
  });

  it("should have correct data length" , () => {
      const data = XORTrainData.generate(100);
      expect(data.length).to.equal(100);
  });
});
