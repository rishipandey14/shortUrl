import client from "../config/redis.js";

const TTL = 120;

export async function getShortId(redirectUrl) {
    return client.get(`redirect:${redirectUrl}`)
};

export async function cacheShortId(redirectUrl, shortId) {
    return client.set(`redirect:${redirectUrl}`, shortId, { EX: TTL });
};

export async function getRedirectUrl(shortId) {
    return client.get(`url:${shortId}`)
};

export async function cacheRedirectUrl(shortId, redirectUrl) {
    return client.set(`url:${shortId}`, redirectUrl, { EX: TTL });
};

