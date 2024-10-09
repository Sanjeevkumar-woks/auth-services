import express from "express";
import authRoutes from "./authRoutes.js";
import userRoutes from "./userRoutes.js";

//create express router for apis
const apis = express.Router();

//add routes for apis
apis.use("/auth", authRoutes);
apis.use("/user", userRoutes);

export default apis;
