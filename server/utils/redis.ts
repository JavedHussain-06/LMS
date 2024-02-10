import {Redis} from "ioredis"
require("dotenv").config()

const redisClient = () =>{
    if(process.env.REDIS){
        console.log("Redis is running")
    }

    throw new Error("Redis connection failed!⚠️")
}

const redis = new Redis(redisClient())

// /^[^\s@]+@[^\s@]+\.[^@]+$/