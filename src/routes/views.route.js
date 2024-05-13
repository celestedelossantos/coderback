import { ProductManager } from '../Class/Product.js';
import { __dirname } from '../utils.js';
import { Router } from 'express';
const router = Router();
const productList = new ProductManager(__dirname + '/data/databaseproducts.json');

router.get('/', async (req, res) => {
    const list = await productList.getProducts();

    res.render('index', { list })
})

router.get('/realtimeproducts', async (req, res) => {
    const list = await productList.getProducts();

    res.render('realTimeProducts', { list })
})


export default router