export class XORTrainData {

    public static getRandomZeroOrOne() {
        return Math.round(Math.random());
    }

    public static generate(iterations: number = 1000) {
        const matrix = [];

        for (let i = 0; i < iterations; i++) {
            const param1 = this.getRandomZeroOrOne();
            const param2 = this.getRandomZeroOrOne();
            const result = (param1 === param2) ? 0 : 1; // XOR OPERATOR !!!

            matrix.push([[param1, param2], [result]]);
        }

        return matrix;
    }
}
