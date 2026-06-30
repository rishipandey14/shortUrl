import {UAParser} from "ua-parser-js";
import geoip from "geoip-lite";
import URL from "../Models/url.js";


export async function addVisit(shortId, req) {
    const parser = new UAParser(req.headers["user-agent"]);
    const result = parser.getResult();

    console.log("Result -> ", result);

    const ip = req.headers["x-forwarded-for"]?.split(",")[0] || req.socket.remoteAddress;
    const geo = geoip.lookup(ip);
    
    await URL.updateOne(
        { shortId },
        {
            $push: {
                visitHistory: {
                    timestamp: new Date(),
                    ip,
                    browser: result.browser.name,
                    os: result.os.name,
                    device: result.device.type || "desktop",
                    country: geo?.country,
                    city: geo?.city,
                    referer: req.headers.referer || "Direct",
                }
            }
        }
    );
}