import { getAnalyticsData } from "../services/analytics.service.js"

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
}