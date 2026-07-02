import { getAnalyticsData, getUrlAnalyticsData } from "../services/analytics.service.js"

export const getAnalytics = async (req, res) => {
    try {
        const result = await getAnalyticsData();
        return res
            .status(result.status)
            .json(result.data)
    } catch (err) {
        return res.status(400).json({
            error : err.message
        });
    }
};

export const getUrlAnalytics = async(req, res) => {
    try {
        const shortId = req.params.shortId;
        console.log("shortId -> ", shortId);

        const result = await getUrlAnalyticsData(shortId);
        return res
            .status(result.status)
            .json(result.data)
    } catch (err) {
        return res.status(400).json({
            error : err.message
        });
    }
};