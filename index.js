import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import IpLocation from './ipLocation.js';
import cors from 'cors';

dotenv.config();

const port = process.env.PORT;

const app = express();

app.use(cors());

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.get('/', (req, res) => {
    const {latitude, longitude} = req.query;
    if(latitude && longitude) {
        const newIpLocation = new IpLocation({
            ip: req.ip || req.headers['x-forwarded-for'],
            latitude,
            longitude,
            type: "geoip",
        });
        newIpLocation.save();
    }
    else
    {
        const newIpLocation = new IpLocation({
            ip: req.ip || req.headers['x-forwarded-for'],
            type: "geoip-lite"
        });
        newIpLocation.save();
    }
    return res.send("OK");
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    }
);