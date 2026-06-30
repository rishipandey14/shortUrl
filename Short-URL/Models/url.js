import mongoose from 'mongoose';

const urlSchema = new mongoose.Schema({
    shortId: {
        type: String,
        required: true,
        unique: true,
    },
    redirectUrl: {
        type: String,
        required: true,
    },
    visitHistory: [
        { 
            timestamp: Date,
            ip: String,
            browser: String,
            os: String,
            device: String,
            country: String,
            city: String,
            referrer: String,
        }
    ],
    }, 
    {timestamps: true}
);

const URL = mongoose.model('url', urlSchema);

export default URL;