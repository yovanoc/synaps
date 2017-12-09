import ActivationFunction from "./ActivationFunction";

export default class Identity extends ActivationFunction {

  public evaluate(x) {
    return x;
  }

  public evaluateDerivative(x) {
    return 1;
  }

  public getLowerBound() {
    return Number.NEGATIVE_INFINITY;
  }

  public getUpperBound() {
    return Number.POSITIVE_INFINITY;
  }

  public isMonotonic() {
    return true;
  }

  public isDerivativeMonotonic() {
    return true;
  }

  public isCenteredAroundZero() {
    return true;
  }

}
