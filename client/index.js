import express from 'express';
import { connectDB } from './config/database.js';
import urlRouter from './Routes/url.route.js';
import { connectRedis } from './config/redis.js';
import analyticsRouter from './Routes/analytics.route.js';

const app = express();
app.use(express.json());

// connect to MongoDB
await connectDB()

// connect to Redis
await connectRedis()

// mount routes
app.use('/url', urlRouter);
app.use('/analytics', analyticsRouter);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server started at PORT: ${PORT}`);
});

