import ActivationFunction from "./ActivationFunction";

export default class LogisticFunction extends ActivationFunction {

  public evaluate(x) {
    return 1 / (1 + Math.exp(-x));
  }

  public evaluateDerivative(x) {
    return this.evaluate(x) * (1 - this.evaluate(x));
  }

  public getLowerBound() {
    return 0;
  }

  public getUpperBound() {
    return 1;
  }

  public isMonotonic() {
    return true;
  }

  public isDerivativeMonotonic() {
    return false;
  }

  public isCenteredAroundZero() {
    return false;
  }

}
