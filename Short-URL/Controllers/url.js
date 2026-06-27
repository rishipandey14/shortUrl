import {nanoid} from 'nanoid';
import client from '../config/redis.js';
import URL from '../Models/url.js';

export const generateShortUrl = async (req, res) => {
    try {
        const { redirectUrl } = req.body;
        if( !redirectUrl) {
            return res.status(400).json({
                Error : 'Redirect URL is required'
            });
        }

        // 1 -> Check Redis First
        const cachedShortId = await client.get(`redirect:${redirectUrl}`);
        
        if(cachedShortId) {
            return res.status(200).json({
                shortId: cachedShortId
            });
        }
        
        // 2 -> Check MongoDB for existing shortId
        const existingUrl = await URL.findOne({redirectUrl});
        
        if(existingUrl) {
            // store in redis for future requests
            await client.set(
                `redirect:${redirectUrl}`,
                existingUrl.shortId,
                { EX: 120 }
            );

            return res.status(200).json({
                shortId : existingUrl.shortId
            });
        }

        // 3 -> Create a new ShortUrl
        let shortId = nanoid(7);
        // ensure uniqueness
        while(await URL.findOne({ shortId })) {
            shortId = nanoid(7);
        }

        const doc = await URL.create({
            redirectUrl,
            shortId
        });

        // store both mappings
        await Promise.all([
            client.set(`redirect:${redirectUrl}`, shortId, {EX: 120}),
            client.set(`url:${shortId}`, redirectUrl, {EX: 120})
        ])

        return res.status(201).json({
            shortId : doc.shortId
        });
    } catch (err) {
        return res.status(400).json({
            error : err.message
        });
    }
};


