import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const connectToMongoDB=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_DB_URL);
        console.log("Connected to mongoDB")

    } catch (error) {
        console.log("Error Connecting to mongo db",error.message)
    }
    }
export default connectToMongoDB