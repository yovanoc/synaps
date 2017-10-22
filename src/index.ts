import ArcTangent from "./Activation/ArcTangent";
import BinaryStep from "./Activation/BinaryStep";
import GaussianFunction from "./Activation/GaussianFunction";
import HyperbolicTangent from "./Activation/HyperbolicTangent";
import Identity from "./Activation/Identity";
import LogisticFunction from "./Activation/LogisticFunction";
import RectifiedLinearUnit from "./Activation/RectifiedLinearUnit";
import SinusoidFunction from "./Activation/SinusoidFunction";
import FeedForwardNeuralNetwork from "./FeedForwardNeuralNetwork";
import NeuralNetwork from "./NeuralNetwork";

export default {
    Activation: {
        ArcTangent,
        BinaryStep,
        GaussianFunction,
        HyperbolicTangent,
        Identity,
        LogisticFunction,
        RectifiedLinearUnit,
        SinusoidFunction,
    },
    Network: {
        Type: {
            FeedForward: FeedForwardNeuralNetwork,
        },
    },
};
