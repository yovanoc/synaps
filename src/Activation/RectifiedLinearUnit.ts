import ActivationFunction from "./ActivationFunction";

export default class RectifiedLinearUnit extends ActivationFunction {

  /**
   * The parameter for a "leaky" or parameterized version of this function
   *
   * Enabled when using a non-zero value, small positive numbers such as `0.01` should be used
   *
   * @type {number}
   * @private
   */
  private parameter: number;

  /**
   * Rectified Linear Unit (ReLU), also known as a "ramp function", that can be used as an activation function
   *
   * This function inhibits all input below the threshold of zero
   *
   * The major advantages are that this function prevents the vanishing gradient problem and is fast to compute
   *
   * The major downside of this function is that a significant share of neurons may irreversibly "die"
   *
   * The "dying ReLU" problem occurs especially with large learning
   * rates and prevents neurons from activating ever again
   *
   * The "leaky" or parameterized versions of this function are an attempt to fix the "dying ReLU" problem
   *
   * @constructor
   * @extends ActivationFunction
   * @param {number} [parameter] - the parameter for a "leaky" or parameterized version, i.e. a small positive number
   */
  constructor(parameter: number = 0) {
    super();

    this.parameter = parameter;
  }

  public evaluate(x) {
    if (x < 0) {
      return this.parameter * x;
    } else {
      return x;
    }
  }

  public evaluateDerivative(x) {
    if (x < 0) {
      return this.parameter;
    } else {
      return 1;
    }
  }

  public getLowerBound() {
    if (this.parameter > 0) {
      return Number.NEGATIVE_INFINITY;
    } else {
      return 0;
    }
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
    return false;
  }

}
