import dotenv from "dotenv";
import connectDB from "./config/mongodb.js";
import app from "./server.js";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

//config dotenv
dotenv.config();

//function to Start Server
const bootstrap = async () => {
  try {
    //env variables
    const PORT = process.env.PORT;
    const MONGO_URI = process.env.MONGO_URI;

    //connect to mongodb
    connectDB(MONGO_URI);

    //server Listening
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    //error handling
    console.info(error);
  }

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });
};

bootstrap();
