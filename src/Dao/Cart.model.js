import mongoose from "mongoose";

const cartCollection = 'carts';

const cartSchema = new mongoose.Schema({

})

export const cartModel = mongoose.model(cartCollection, cartSchema)