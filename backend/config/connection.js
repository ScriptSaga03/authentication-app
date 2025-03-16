require("dotenv").config();
const mongoose=require("mongoose");

// Enviroment variable
const MONGOOSEDB_URI=process.env.MONGOOSEDB_URI;
// console.log("MONGOOSEDB_URI",MONGOOSEDB_URI)


// connection
const connectDB = async()=>{
    try {
        await mongoose.connect(MONGOOSEDB_URI);
        console.log("✅ MongoDB Connected with MongooseDB");
    } catch (error) {
        console.log("❌ MongoDB Connection Failed: ",error);
        process.exit(1);
    }
}

module.exports={
    connectDB
}