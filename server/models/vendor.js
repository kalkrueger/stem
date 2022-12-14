import mongoose from "mongoose";
const Schema = mongoose.Schema;

const vendorSchema = new Schema({
    name: {type: String, required: true },
    shortHand: {type: String, required: true, maxLength: 4 },
    shippingMethods: [{
        type: Schema.Types.ObjectId,
        ref: "shippingMethod"
    }],
});

const Vendor = mongoose.model("vendor", vendorSchema);

export default Vendor;