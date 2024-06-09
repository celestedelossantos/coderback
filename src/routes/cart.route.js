import { Router } from 'express';
import { CartManager } from '../Dao/Cart.js';
import { cartModel } from '../Dao/models/Cart.model.js';

const router = Router();
const cartsManager = new CartManager('./src/data/databasecarts.json');

router.post('/', async (req, res) => {
    const newCart = await cartModel.create({
        products: []
    })

    res.status(201).json({ message: 'Save is successfully', cart: newCart })
});

router.get('/:cid', async (req, res) => {
    const { cid } = req.params

    const cartFinded = await cartModel.findById(cid);

    const status = cartFinded ? 200 : 404;

    res.status(status).json({ productList: cartFinded?.products });
});

router.post('/:cid/product/:pid', async (req, res) => {
    const { cid, pid } = req.params;

    const cartFinded = await cartModel.findById(cid);
    if(!cartFinded) res.status(404).json({ message: 'error' });

    const indexProd = cartFinded.products.findIndex(prod => prod.id === pid);
    if(indexProd === -1){
        cartFinded.products.push({ id: pid, quantity: 1 })
    } else {
        cartFinded.products[indexProd] = { ...cart.products[indexProd], quantity: cartFinded.products[indexProd].quantity + 1 }
    }
    const cartUpdated = await cartModel.findByIdAndUpdate(cid,cartFinded, {
        new: true,
    })

    res.status().json({ message: 'Product Added', cart: cartUpdated})

});

export default router