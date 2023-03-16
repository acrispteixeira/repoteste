import express from "express";
let router = express.Router();
import userRepository from "../repositories/UserRepository.js";

router.get("/addUser", function(req, res){
    const user = userRepository.save();
    return res.status(200).json(user);
});

export default router;