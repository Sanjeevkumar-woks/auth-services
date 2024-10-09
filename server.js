import express from "express";
import cors from "cors";
import apis from "./src/routes/index.js";

//create express app
const app = express();

//add middleware for parsing request body to json
app.use(express.json());

//add middleware for cors for all routes to allow cross origin requests
app.use(cors());

//add routes here for the apis
app.use("/auth-service", apis);

export default app;
