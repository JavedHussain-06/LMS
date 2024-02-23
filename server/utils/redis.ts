require("dotenv").config();
import { Redis } from "ioredis";

const createRedisClient = () => {
    if (process.env.REDIS_URL) {
        console.log("Redis is running");
        return new Redis(process.env.REDIS_URL, {
            tls: {
                rejectUnauthorized: false // You may need to set this to true in production
            }
        });
    } else {
        throw new Error("Redis connection failed!⚠️");
    }
};

export const redis = createRedisClient();
