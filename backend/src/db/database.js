import mongoose from "mongoose";


const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect("mongodb://localhost:27017/pas")
    } catch (error) {
        console.log("MONGODB connection FAILED ", error);
        process.exit(1)
    }
}

export default connectDB