import { Dendrite } from "./Dendrite";

export class Axon {

    public outboundDendrites: Dendrite[];

    constructor() {
        this.outboundDendrites = [];
    }

    public addOutboundDendrite(dendrite: Dendrite) {
        this.outboundDendrites.push(dendrite);
    }

    public fire(value: number) {
        const activationValue = this.calculateActivationValue(value);
        const dendrites = this.outboundDendrites;

        for (const dendrite of dendrites) {
            dendrite.fire(activationValue);
        }
    }

    private calculateActivationValue(value: number): number {
        return 1 / (1 + Math.pow(Math.E, -value));
    }

}
