import { Router } from 'express';
import { ProductManager } from "../Class/Product.js";

const router = Router();
const productList = new ProductManager('./src/data/databaseproducts.json');

router.post('/', async (req, res) => {
    const prod = req.body

    await productList.addProduct(prod)

    res.status(201).json({ message: 'Add successfully' })
});

router.get('/', async (req, res) => {
    const { limit } = req.query

    const products = await productList.getProducts()
    const productByLimit = limit ? products.slice(0,limit) : products

    res.json(productByLimit)
});

router.get('/:id', async (req, res) => {
    const { id } = req.params

    const productById = await productList.getProductById(id);
    
    if(!productById) res.status(404).json({ message: 'Product not found'})

    res.json(productById)
});

router.put('/:id', async (req, res) => {
    const { body, params } = req
    const product = body;
    const { id } = params;

    await productList.updateProduct(id, product);

    res.status(201).json({ message: 'Updated successfully' })
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    await productList.deleteProduct(id);

    res.status(200).json({ message: 'Deleted successfully' })
});

export default router