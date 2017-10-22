import ActivationFunction from "./ActivationFunction";

export default class HyperbolicTangent extends ActivationFunction {

    public evaluate(x) {
        return (Math.exp(x) - Math.exp(-x)) / (Math.exp(x) + Math.exp(-x));
    }

    public evaluateDerivative(x) {
        return 1 - Math.pow(this.evaluate(x), 2);
    }

    public getLowerBound() {
        return -1;
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
        return true;
    }

}
