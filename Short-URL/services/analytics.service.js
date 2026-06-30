import URL from "../Models/url.js"

export const getAnalyticsData = async () => {
    const totalUrls = await URL.countDocuments();

    const urls = await URL.find();
    let totalClick = 0;
    
    for(const url of urls) {
        totalClick += url.visitHistory.length;
    }

    const topUrls = urls
        .map(url => ({
            shortId: url.shortId,
            clicks: url.visitHistory.length
        }))
        .sort((a, b) => b.clicks - a.clicks)
        .slice(0, 10);
    return {
        status: 200,
        data: {
            totalUrls: totalUrls,
            totalClick: totalClick,
            topUrls: topUrls,
        }
    }
}



// {
//   "totalUrls": 125,
//   "totalClicks": 4832,
//   "activeUrls": 97,
//   "topUrls": [
//     {
//       "shortId": "abc1234",
//       "clicks": 245
//     },
//     {
//       "shortId": "xyz9876",
//       "clicks": 198
//     }
//   ]
// }