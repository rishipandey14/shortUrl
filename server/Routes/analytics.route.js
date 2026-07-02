import express from "express";
import { getAnalytics, getUrlAnalytics } from "../Controllers/analytics.controller.js";

const analyticsRouter = express.Router();

analyticsRouter.get('/', getAnalytics);
analyticsRouter.get('/:shortId', getUrlAnalytics);

export default analyticsRouter;