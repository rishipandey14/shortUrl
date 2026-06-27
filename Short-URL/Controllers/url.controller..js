import {nanoid} from 'nanoid';
import client from '../config/redis.js';
import URL from '../Models/url.js';
import * as urlService from "../services/url.service.js"

export const generateShortUrl = async (req, res) => {
    try {
        const result = await urlService.generate(req.body.redirectUrl);
        
        return res
            .status(result.status)
            .json(result.data)

    } catch (err) {
        return res.status(400).json({
            error : err.message
        });
    }
};


export const getRedirectUrl = async (req, res) => {
    try {
        const result = await urlService.redirect(req.params.shortId);
        
        return res
            .status(result.status)
            .json(result.data)

    } catch (err) {
        return res.status(400).json({
            error : err.message
        });
    }
};


































// async function handleRedirect(req, res) {
// 	try {
// 		const { id } = req.params;
// 		const doc = await URL.findOne({ shortId: id });
// 		if (!doc) return res.status(404).json({ error: 'Not found' });

// 		// record visit
// 		doc.visitHistory.push({ timestamp: Date.now() });
// 		await doc.save();

// 		return res.redirect(doc.redirectUrl);
// 	} catch (err) {
// 		console.error(err);
// 		return res.status(500).json({ error: 'internal server error' });
// 	}
// }

// module.exports = { handleGenerateNewShortURL, handleRedirect };