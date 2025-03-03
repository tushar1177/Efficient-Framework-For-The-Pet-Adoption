import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        age: {
            type: Number,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        sex: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
        },
        phone: {
            type: String,
            required: true,
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        image: {
            type: String,  // Stores the file path of the uploaded image
            required: false, // Not required (user can add pets without an image)
        },
    },
    {
        timestamps: true
    }
);

export const Product = mongoose.model("product", productSchema);
export default Product;