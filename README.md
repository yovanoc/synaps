# Synaps

TypeScript Neural Network Library

## Installation

 * In the browser

   ```html
   <script type="text/javascript" src="https://unpkg.com/synaps"></script>
   ```

 * In Node.js

   ```
   $ npm install synaps
   ```

   and

   ```javascript
   const synaps = require("synaps").default;
   ```

   or in es6 or TypeScript

   ```javascript
   import synaps from "synaps";
   ```

## Usage

 * Creating a new instance

   * Neural network with 3 input neurons and 1 output neuron

     ```javascript
     let network = new synaps.Network.Type.FeedForward(3, [], 1);
     ```

   * Neural network with 4 input neurons, 3 hidden neurons and 2 output neurons

     ```javascript
     let network = new synaps.Network.Type.FeedForward(4, [ 3 ], 2);
     ```

   * Neural network with 6 input neurons, two hidden layers with 4 and 2 neurons, and 3 output neurons

     ```javascript
     let network = new synaps.Network.Type.FeedForward(6, [ 4, 2 ], 3);
     ```

 * Passing any number of additional options to the network

   ```javascript
   // pass an object containing the desired options as the fourth parameter
   let network = new synaps.Network.Type.FeedForward(3, [ 4 ], 1, {
       seed: 501935,
       learningRate: 0.3,
       hiddenLayerActivationFunction: new synaps.Activation.HyperbolicTangent(),
       outputLayerActivationFunction: new synaps.Activation.BinaryStep()
   });
   ```

 * Available activation functions

   ```javascript
   new synaps.Activation.ArcTangent();
   new synaps.Activation.BinaryStep();
   new synaps.Activation.GaussianFunction();
   new synaps.Activation.HyperbolicTangent();
   new synaps.Activation.Identity();
   new synaps.Activation.LogisticFunction();
   new synaps.Activation.RectifiedLinearUnit();
   new synaps.Activation.RectifiedLinearUnit(0.01);
   new synaps.Activation.SinusoidFunction();
   ```

 * Training the network using supervised batch ("all-at-once") learning

   ```javascript
   // the first parameter is the array of inputs and the second parameter is the array of desired outputs
   // the third parameter is the optional number of iterations and the fourth parameter is the optional error threshold
   let error = network.trainBatch(
       [
           [0, 0, 1],
           [0, 1, 1],
           [1, 0, 1],
           [1, 1, 1]
       ],
       [
           [ 0 ],
           [ 1 ],
           [ 1 ],
           [ 0 ]
       ],
       60000,
       0.005
   );
   ```

 * Training the network using supervised online ("single-pattern") learning

   ```javascript
   // the first parameter is the input and the second parameter is the desired output
   let error = network.train([0, 0, 1], [ 0 ]);
   ```

 * Asking the network to predict some output from a supplied input pattern

   ```javascript
   // the single parameter is the input to process
   network.predict([ 0, 0, 1 ])
   ```

 * Saving the network with all its properties to a JSON string

   ```javascript
   let jsonStr = JSON.stringify(network);
   ```

 * Restoring the network with all its properties from a JSON string

   ```javascript
   let network = synaps.Network.Type.FeedForward.fromJson(jsonStr);
   ```

## Development

 * Prerequisites

   ```
   $ npm install
   ```

* Lint the js files

    ```
    $ npm lint
    ```
    or to fix some errors automatically
    ```
    $ npm lint:fix
    ```  


* Build the js files

    ```
    $ npm build
    ```  

 * Running the Node.js examples

   ```
   $ node examples/node.js
   ```

## Contributing

All contributions are welcome! If you wish to contribute, please create an issue first so that your feature, problem or question can be discussed.

### Socials Links

- [Discord](https://discord.gg/hUTW6jQ)
- [Slack](https://join.slack.com/t/synapsworkspace/shared_invite/enQtMjU4NjU4NzgwNDY2LWU4M2I0MWFlYzYxYzVjMjIyMzdkOTAzNDc4MzI4ZDAzM2ExYmVmYWIzZTAzMDcwNGFiZjNiOWQzNzkxNWEwYWQ)
