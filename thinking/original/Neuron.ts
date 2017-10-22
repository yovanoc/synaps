import { Axon } from "./Axon";
import { Dendrite } from "./Dendrite";

export class Neuron {

    private axon: Axon;
    private dendrites: Dendrite[];
    private dendriteValues: number[];

    constructor() {
        this.dendrites = [];
        this.dendriteValues = [];
        this.axon = new Axon();
    }

    get inboundDendrites(): Dendrite[] {
        return this.dendrites;
    }

    public addInboundDendrite(newDendrite: Dendrite) {
        this.dendrites.push(newDendrite);
    }

    public injectInputNeurons(inputNeurons: Neuron[]) {
        for (const inputNeuron of inputNeurons) {
            const dendrite = new Dendrite(this);
            inputNeuron.axon.addOutboundDendrite(dendrite);
            this.addInboundDendrite(dendrite);
        }
    }

    public addDendriteValue(newIncomingDendriteValue: number) {
        this.dendriteValues.push(newIncomingDendriteValue);
        // check if all dendrites have given their value
        if (this.dendriteValues.length !== this.dendrites.length) {
            return;
        }
        const sumValue = this.sumDendriteValues();
        this.axon.fire(sumValue);
        console.log("Fired", sumValue);
        this.reloadDendrites();
        this.dendriteValues = [];
    }

    public sumDendriteValues(): number {
        let totalValue = 0;
        for (const value of this.dendriteValues) {
            totalValue += value;
        }
        return totalValue;
    }

    public reloadDendrites() {
        for (const dendrite of this.dendrites) {
            dendrite.reload();
        }
    }

}
