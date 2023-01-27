import mongoose from "mongoose";

const ipLocationSchema = new mongoose.Schema({
    ip: {
        type: String,
    },
    latitude: {
        type: String,
    },
    longitude: {
        type: String,
    },
    type: {
        type: String,
    }
});

export default mongoose.model("IpLocation", ipLocationSchema);