import mongoose, { Schema } from "mongoose";

const cartCollection = 'carts';

const Product = new Schema({
    id: String,
    quantity: Number
})

const cartSchema = new Schema({
    products: [Product],
})

export const cartModel = mongoose.model(cartCollection, cartSchema)