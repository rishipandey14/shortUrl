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
        const result = await urlService.redirect(req.params.shortId, req);
        
        return res
            .status(result.status)
            .json(result.data)

    } catch (err) {
        return res.status(400).json({
            error : err.message
        });
    }
};

