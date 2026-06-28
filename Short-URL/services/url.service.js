import {nanoid} from "nanoid";
import URL from "../Models/url.js";
import * as cacheService from "./cache.service.js";
import { ApiError } from "../utils/apiError.js";


export const generate = async (redirectUrl) => {
    // validate input
    if(!redirectUrl) {
        throw new ApiError(400, "Redirect URL is required");
    }

    // check redis
    const cachedShortId = await cacheService.getShortId(redirectUrl);
    
    if(cachedShortId) {
        return {
            status: 200,
            data: {
                shortId: cachedShortId,
            },
        };
    }

    // check mongoDB
    const existingUrl = await URL.findOne({redirectUrl});

    if(existingUrl) {
        await cacheService.cacheShortId(redirectUrl, existingUrl.shortId);

        return {
            status: 200,
            data: {
                shortId: existingUrl.shortId,
            },
        };
    }

    // generate unique shortId
    let shortId = nanoid(7);

    while(await URL.findOne({ shortId })) {
        shortId = nanoid(7);
    }

    // save to mongoDB
    const doc = await URL.create({
        redirectUrl,
        shortId
    });

    // save in redis
    await Promise.all([
        cacheService.cacheShortId(redirectUrl, shortId),
        cacheService.cacheRedirectUrl(redirectUrl, shortId)
    ]);

    return {
        status: 201,
        data: {
            shortId: shortId,
        },
    };
};

export const redirect = async (shortId) => {
    // check redis
    const cachedRedirectUrl = await cacheService.getRedirectUrl(shortId);

    if(cachedRedirectUrl) {
        // update visit history
        await URL.updateOne(
            {shortId: shortId},
            {
                $push: {
                    visitHistory: {timestamp: Date.now()}
                }
            }
        );
        return {
            status: 302,
            data: {
                redirectUrl: cachedRedirectUrl
            }
        };
    }

    // 2 -> query mongoDb
    const entry = await URL.findOne({shortId});

    if(!entry) {
        throw new ApiError(404 ,"URL not found");
    } 

    // add in cache for future requests
    await cacheService.cacheRedirectUrl(entry.redirectUrl, shortId);

    // update visit history
    await URL.updateOne(
        {shortId: shortId},
        {
            $push: {
                visitHistory: {timestamp: Date.now()}
            }
        }
    )
    return {
        status: 302,
        data: {
            redirectUrl: entry.redirectUrl,
        }
    };
};