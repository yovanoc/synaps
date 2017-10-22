import ActivationFunction from "./ActivationFunction";

export default class ArcTangent extends ActivationFunction {

    public evaluate(x) {
        return Math.atan(x);
    }

    public evaluateDerivative(x) {
        return 1 / (x ** 2 + 1);
    }

    public getLowerBound() {
        return - Math.PI / 2;
    }

    public getUpperBound() {
        return Math.PI / 2;
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
