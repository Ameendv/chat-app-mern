import mongoose from "mongoose";

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI)
        mongoose.set('debug', true)
        console.log('connected to database')
    } catch (error) {
        console.log("Error connecting mongodb", error.message)
        
    }
}

export default connectToMongoDB