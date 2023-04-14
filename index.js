import express from 'express';
import dotenv from "dotenv";
import mongoose from "mongoose";

import authRoute from "./routes/auth.js";

const app = express();
dotenv.config();

const CONNECTION_STRING = process.env.MONGO || 'mongodb://127.0.0.1:27017/booking'

const connect = async () => {
    try {
        // connect local database
        await mongoose.connect(CONNECTION_STRING)
    } catch (error) {
        throw error;
    }
};

// listen connect to databse, success or fail
mongoose.connection.on("disconnected", ()=>{
    console.log("fail to connect databse")
})

mongoose.connection.on("connected", ()=>{
    console.log("success to connect databse")
})


// middlewares
app.use("/api/auth", authRoute);

app.get('/', (req, res) => {res.send('Welcome to Full Stack Development!')})

app.listen(6600, ()=>{
    connect()
    console.log("Connected app server")
});