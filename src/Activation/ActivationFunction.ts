/**
 * Activation function for an artificial neural network
 *
 * An activation function is applied on a neuron and determines its activation based on its weighted inputs
 *
 * The main factor in deciding which activation function to use is usually the range of the function
 *
 * The hyperbolic tangent and the Rectified Linear Unit (ReLU) are the most commonly used functions
 *
 */
export default abstract class ActivationFunction {

    /**
     * Evaluates the function at the specified point
     *
     * @abstract
     * @param {number} x - the point to evaluate the function at
     * @return {number} the function value
     */
    public abstract evaluate(x: number): number;

    /**
     * Evaluates the derivative of the function at the specified point
     *
     * @abstract
     * @param {number} x - the point to evaluate the derivative at
     * @return {number} the derivative's function value
     */
    public abstract evaluateDerivative(x: number): number;

    /**
     * Returns the least possible value of this function
     *
     * @abstract
     * @return {number} the lower bound
     */
    public abstract getLowerBound(): number;

    /**
     * Returns the greatest possible value of this function
     *
     * @abstract
     * @return {number} the upper bound
     */
    public abstract getUpperBound(): number;

    /**
     * Returns whether this function is monotonic
     *
     * @abstract
     * @return {boolean} whether the function is monotonic
     */
    public abstract isMonotonic(): boolean;

    /**
     * Returns whether this function's derivative is monotonic
     *
     * @abstract
     * @return {boolean} whether the function's derivative is monotonic
     */
    public abstract isDerivativeMonotonic(): boolean;

    /**
     * Returns whether the graph of this function is very close to the origin
     *
     * @abstract
     * @return {boolean} whether the graph is centered around `(0,0)`
     */
    public abstract isCenteredAroundZero(): boolean;

    public toJSON() {
        // TODO: this.constructor.name
        return this.constructor.toString;
    }
}
