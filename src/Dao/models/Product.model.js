import mongoose, { Schema } from "mongoose";

const productCollection = 'products';

const ProductSchema = new Schema({
    "title": String,
    "description": String,
    "price": Number,
    "thumbnail": String,
    "code": Number,
    "stock": Number,
})



export const productModel = mongoose.model(productCollection, ProductSchema)