import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        const url = process.env.MONGO_URL;
        await mongoose.connect(url);
        console.log("MongoDB connected");
    } catch (err) {
        console.error("MongoDB connection error : ", err.message);
        throw err;
    }
};
