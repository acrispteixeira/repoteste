import Evaluation from "../models/Evaluation.js";

function getAll() {
    const evaluation = new Evaluation(1, 1, 1, "Concept");
    return evaluation;
};

const factory = {
    getAll
  };
  export default factory;