import Teacher from "../models/Teacher.js";

function getAll() {
    const teacher = new Teacher(1, "Ana", 1);
    return teacher;
};

const factory = {
    getAll
  };
  export default factory;