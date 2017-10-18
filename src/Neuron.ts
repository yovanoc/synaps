import { Axon } from "./Axon";
import { Dendrite } from "./Dendrite";

export class Neuron {

    public axon: Axon = new Axon();

    private dendrites: Dendrite[];
    private dendriteValues: number[];

    get inboundDendrites(): Dendrite[] {
        return this.dendrites;
    }

    public addInboundDendrite(newDendrite: Dendrite) {
        this.dendrites.push(newDendrite);
    }

    public injectInputNeurons(inputNeurons: Neuron[]): Neuron {
        const newNeuron = new Neuron(); // FIXME: Not sure!

        for (const inputNeuron of inputNeurons) {
            const axon = inputNeuron.axon;
            const dendrite = new Dendrite(newNeuron);

            axon.addOutboundDendrite(dendrite);
            newNeuron.addInboundDendrite(dendrite);
        }

        return newNeuron;
    }

    public addDendriteValue(newIncomingDendriteValue: number) {
        this.dendriteValues.push(newIncomingDendriteValue);
        // check if all dendrites have given their value
        if (this.dendriteValues.length !== this.dendrites.length) {
            return;
        }

        const sumValue = this.sumDendriteValues();

        this.axon.fire(sumValue);
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
