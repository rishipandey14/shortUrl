import express from "express";
import { getAnalytics } from "../Controllers/analytics.controller.js";

const analyticsRouter = express.Router();

analyticsRouter.get('/', getAnalytics);

export default analyticsRouter;