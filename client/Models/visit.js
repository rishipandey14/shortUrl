import mongoose from "mongoose";

const visitScheme = new mongoose.Schema(
    {
        shortId: {
            type: String,
            required: true,
            index: true,
        },
        timeStamp: {
            type: Date,
            default: Date.now(),
        },
        ip: String,
        browser: String,
        os: String,
        device: String,
        country: String,
        city: String,
        referer: String,
    },
    {
        timeStamps: true,
    }
);

const VISIT = mongoose.model("Visit", visitScheme);
export default VISIT;