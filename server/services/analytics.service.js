import URL from "../Models/url.js"
import { getStatsByField, getDailyClicks } from "../utils/helperFunctions.js";
import VISIT from "../Models/visit.js";
import { ApiError } from "../utils/apiError.js";

export const getAnalyticsData = async () => {
    const totalUrls = await URL.countDocuments();

    const urls = await URL.find();
    const totalClick = await VISIT.countDocuments();

    const topUrls = await VISIT.aggregate([
        {
            $group: {
                _id: "$shortId",
                clicks: { $sum: 1 }
            }
        },
        {
            $sort: {
                clicks: -1
            }
        },
        {
            $limit: 10
        },
        {
            $project: {
                _id: 0,
                shortId: "$_id",
                clicks: 1
            }
        }
    ]);
    return {
        status: 200,
        data: {
            totalUrls: totalUrls,
            totalClick: totalClick,
            topUrls: topUrls,
        }
    }
};

export const getUrlAnalyticsData = async (shortId) => {
    const url = await URL.findOne({shortId});
    if (!url) {
        throw new ApiError(404, "URL not found");
    }
    
    const totalClicks = await VISIT.countDocuments({ shortId });
    const browserStats = await getStatsByField(shortId, "browser");
    const osStats = await getStatsByField(shortId, "os");
    const deviceStats = await getStatsByField(shortId, "device");
    const countryStats = await getStatsByField(shortId, "country");
    const cityStats = await getStatsByField(shortId, "city");
    const dailyClicks = await getDailyClicks(shortId);

    return {
        status: 200,
        data: {
            shortId: url.shortId,
            redirectUrl: url.redirectUrl,
            createdAt: url.createdAt,
            totalClicks: totalClicks,
            browserStats: browserStats,
            osStats: osStats,
            deviceStats: deviceStats,
            countryStats: countryStats,
            cityStats: cityStats,
            dailyClicks: dailyClicks,
        }
    }
};
