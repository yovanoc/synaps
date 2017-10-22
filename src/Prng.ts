export default class Prng {

    /**
     * The seed for this generator
     *
     * @type {number}
     * @private
     */
    private seed: number;

    /**
     * Pseudorandom number generator (PRNG) that may optionally be seeded
     *
     * @constructor
     * @param {number} [seed] - the value that this PRNG will be seeded with
     */
    constructor(seed?: number) {
        if (seed) {
            this.seed = seed;
        }
        this._sanitizeSeed();
    }

    /**
     * Returns a random floating-point number between the specified lower (inclusive) and upper (exclusive) bound
     *
     * @return {number} the random floating-point number
     */
    public getRandom() {
        if (this._hasSeed()) {
            // get the sine of the seed
            let digits = Math.sin(this.seed);

            // move the first five digits before the comma
            digits *= 10 ** 5;

            // discard everything before the comma
            digits = digits - Math.floor(digits);

            // advance the seed by one step
            this.seed++;

            // return the "random" digits
            return digits;
        } else {
            return Math.random();
        }
    }

    /**
     * Returns a random floating-point number between the specified lower (inclusive) and upper (exclusive) bound
     *
     * @param {number} min - the minimum bound
     * @param {number} max - the maximum bound
     * @return {number} the random floating-point number
     */
    public getRandomFloat(min: number, max: number): number {
        return this.getRandom() * (max - min) + min;
    }

    /**
     * Returns a random integer between the specified lower (inclusive) and upper (inclusive) bound
     *
     * @param {number} min - the minimum bound
     * @param {number} max - the maximum bound
     * @return {number} the random integer
     */
    public getRandomInt(min: number, max: number): number {
        return Math.floor(this.getRandom() * (max - min + 1)) + min;
    }

    /**
     * Returns whether a seed has been provided for this instance or not
     *
     * @return {boolean} whether a seed has been provided
     * @private
     */
    private _hasSeed() {
        return typeof this.seed !== "undefined";
    }

    /**
     * Ensures that the seed (if any) is valid and will provide meaningful results
     *
     * @private
     */
    private _sanitizeSeed() {
        // if a seed has been provided
        if (this._hasSeed()) {
            // if the seed is a multiple of pi
            if ((this.seed % Math.PI) === 0) {
                // modify the seed to guarantee a meaningful first result
                this.seed += 0.1;
            }
        }
    }

}
