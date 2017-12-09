import ActivationFunction from "./ActivationFunction";

export default class GaussianFunction extends ActivationFunction {

  public evaluate(x) {
    return Math.exp(-Math.pow(x, 2));
  }

  public evaluateDerivative(x) {
    return -2 * x * this.evaluate(x);
  }

  public getLowerBound() {
    return 0;
  }

  public getUpperBound() {
    return 1;
  }

  public isMonotonic() {
    return false;
  }

  public isDerivativeMonotonic() {
    return false;
  }

  public isCenteredAroundZero() {
    return false;
  }

}
