import { createClient } from "redis";

const client = await createClient({
    url: process.env.REDIS_URL
});

client.on("error", (err) => console.error("Redis Error:", err));

export const connectRedis = async () => {
    try {
        await client.connect();
        console.log("Redis connected");
    } catch (error) {
        console.error("Redis Connection Error:", error);
        process.exit(1);
    }
};

export default client;