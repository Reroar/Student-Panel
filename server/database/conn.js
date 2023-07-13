import mongoose from "mongoose";

import { MongoMemoryServer } from "mongodb-memory-server";
import ENV from '../config.js'

async function connect(){

    const mongod = await MongoMemoryServer.create();
    const getUri = mongod.getUri();
    const mongoURI = 'mongodb+srv://user:EyptLWlbHDU81Zwm@cluster0.odypyfz.mongodb.net/CampusWatch'


    mongoose.set('strictQuery', true)                                                     
    // const db = await mongoose.connect(getUri);
    const db = await mongoose.connect(mongoURI);
    console.log("Database Connected")
    return db;
}

export default connect;