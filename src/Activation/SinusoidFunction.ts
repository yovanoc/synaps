import ActivationFunction from "./ActivationFunction";

export default class SinusoidFunction extends ActivationFunction {

    public evaluate(x) {
        return Math.sin(x);
    }

    public evaluateDerivative(x) {
        return Math.cos(x);
    }

    public getLowerBound() {
        return -1;
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
        return true;
    }

}
