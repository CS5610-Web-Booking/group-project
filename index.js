import express from 'express';
const app = express();
import mongoose from "mongoose";

const DB_CONNECTION_STRING='mongodb+srv://sunqingqing168:supersecretpassword@cluster0.xjvjium.mongodb.net/booking?retryWrites=true&w=majority'
// const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/booking'
const CONNECTION_STRING = DB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/booking'
// for local test only 
// const CONNECTION_STRING = 'mongodb://127.0.0.1:27017/booking'

const connect = async () => {
    try {
        // connect local database
        await mongoose.connect(CONNECTION_STRING) // process.env.MONGO remote later
        console.log("Connected database")
    } catch (error) {
        throw error;
    }
};


app.get('/', (req, res) => {res.send('Welcome to Full Stack Development!')})

app.listen(6600, ()=>{
    console.log("Connected")
});