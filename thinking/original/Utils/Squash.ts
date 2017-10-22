export class Squash {

    public static LOGISTIC(x: number, derivate: boolean = false): number {
        const fx = 1 / (1 + Math.exp(-x));
        if (!derivate) {
            return fx;
        }
        return fx * (1 - fx);
    }

    // public static TANH(x: number, derivate: boolean = false): number {
    //     if (derivate) {
    //         return 1 - Math.exp(Math.tanh(x), 2);
    //     }
    //     return Math.tanh(x);
    // }

    public static IDENTITY(x: number, derivate: boolean = false): number {
        return derivate ? 1 : x;
    }

    public static HLIM(x: number, derivate: boolean = false): number {
        return derivate ? 1 : x > 0 ? 1 : 0;
    }

    public static RELU(x: number, derivate: boolean = false): number {
        if (derivate) {
            return x > 0 ? 1 : 0;
        }
        return x > 0 ? x : 0;
    }

}
