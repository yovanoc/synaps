import ActivationFunction from "./ActivationFunction";

export default class BinaryStep extends ActivationFunction {

    public evaluate(x) {
        if (x < 0) {
            return 0;
        } else {
            return 1;
        }
    }

    public evaluateDerivative(x) {
        if (x !== 0) {
            return 0;
        } else {
            return Number.NaN;
        }
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
