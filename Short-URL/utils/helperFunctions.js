import {UAParser} from "ua-parser-js";
import geoip from "geoip-lite";
import VISIT from "../Models/visit.js";


export const addVisit = async (shortId, req) => {
    const parser = new UAParser(req.headers["user-agent"]);
    const result = parser.getResult();

    const ip = req.headers["x-forwarded-for"]?.split(",")[0] || req.socket.remoteAddress;
    const geo = geoip.lookup(ip);
    
    await VISIT.create({
        shortId,
        timestamp: new Date(),
        ip,
        browser: result.browser.name || "Unknown",
        os: result.os.name || "Unknown",
        device: result.device.type || "desktop",
        country: geo?.country || "Unknown",
        city: geo?.city || "Unknown",
        referer: req.headers.referer || "Direct",
    });
};

export const getStatsByField = async (shortId, field) => {
    const result = await VISIT.aggregate([
        {
            $match: {shortId}
        },
        {
            $group: {
                _id: {
                    $ifNull: [`$${field}`, "Unknown"]
                },
                count: {
                    $sum: 1
                }
            }
        },
        {
            $sort: {
                count: -1
            }
        }
    ]);
    return result.reduce((stats, item) => {
        stats[item._id] = item.count;
        return stats;
    }, {});
};

export const getDailyClicks = async (shortId) => {
    return await VISIT.aggregate([
        {
            $match: { shortId }
        },
        {
            $group: {
                _id: {
                    $dateToString: {
                        format: "%Y-%m-%d",
                        date: "$timestamp"
                    }
                },
                clicks: {
                    $sum: 1
                }
            }
        },
        {
            $sort: {
                _id: 1
            }
        }
    ]);
};