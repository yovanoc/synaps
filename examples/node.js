const synaps = require("../dist/synaps.min.js").default;

let network = new synaps.Network.Type.FeedForward(2, [ 2 ], 1, {
    seed: 820312,
    learningRate: 0.3,
    hiddenLayerActivationFunction: new synaps.Activation.LogisticFunction(),
    outputLayerActivationFunction: new synaps.Activation.LogisticFunction()
});

console.log("Predictions *before* training");
console.log(network.predict([ 0, 0 ]));
console.log(network.predict([ 0, 1 ]));
console.log(network.predict([ 1, 0 ]));
console.log(network.predict([ 1, 1 ]));

let error = network.trainBatch([
    [ 0, 0 ],
    [ 0, 1 ],
    [ 1, 0 ],
    [ 1, 1 ]
], [
    [ 0 ],
    [ 1 ],
    [ 1 ],
    [ 0 ]
], 50000, 0.005);


console.log("----------");
console.log("Training = " + JSON.stringify(error));
console.log("----------");

console.log("Predictions *after* training");
console.log(network.predict([ 0, 0 ]));
console.log(network.predict([ 0, 1 ]));
console.log(network.predict([ 1, 0 ]));
console.log(network.predict([ 1, 1 ]));
