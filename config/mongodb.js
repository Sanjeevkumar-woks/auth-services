import mongoose from "mongoose";

//function to connect to mongodb
const connectDB = async (MONGO_URI) => {
  try {
    //connect to mongodb
    const conn = await mongoose.connect(MONGO_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    //error handling
    console.error(`Error: ${error.message}`);

    //exit process
    process.exit(1);
  }
};

export default connectDB;
