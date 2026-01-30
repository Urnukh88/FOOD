import mongoose from "mongoose";

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);
    console.log("Connected To MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
  }
};
export default connectToMongoDB;
