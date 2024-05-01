import { ProductManager } from "./Class/Product.js";
import { fileURLToPath } from 'url';
import path from 'path';
import express from 'express';
const app = express();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const productList = new ProductManager(__dirname + '/data/databaseproducts.json');
const port = process.env.PORT || 8080;

app.get('/products', async (req, res) => {
    const { limit } = req.query

    const products = await productList.getProducts()
    const productByLimit = limit ? products.slice(0,limit) : products

    res.json(productByLimit)
});

app.get('/products/:id', async (req, res) => {
    const { id } = req.params

    const productById = await productList.getProductById(id);
    
    if(!productById) res.status(404).json({ message: 'Product not found'})

    res.json(productById)
})

app.listen(port, () => {
    console.log(`Connect server to port ${port}`)
})