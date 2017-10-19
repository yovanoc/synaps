import { Dendrite } from "./Dendrite";
import { Squash } from "./Squash";

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

        console.log("Activation", activationValue);
        console.log("OutboundDendrites", this.outboundDendrites.length);

        if (this.outboundDendrites.length === 0) {
            console.log("Final", activationValue);
            return;
        }

        for (const dendrite of this.outboundDendrites) {
            dendrite.fire(activationValue);
        }
    }

    private calculateActivationValue(value: number): number {
        return Squash.LOGISTIC(value);
    }

}
