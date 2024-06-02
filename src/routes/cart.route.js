import { Router } from 'express';
import { CartManager } from '../Dao/Cart.js';

const router = Router();
const cartsManager = new CartManager('./src/data/databasecarts.json');

router.post('/', async (req, res) => {
    const newCart = await cartsManager.newCart()

    res.status(201).json({ message: 'Save is successfully', cartId: newCart.id })
});

router.get('/:cid', async (req, res) => {
    const { cid } = req.params

    const cartFinded = await cartsManager.getCartById(cid);

    if(!cartFinded) res.status(404).json({ message: 'Not Found' })

    res.json({ productList: cartFinded.products })
});

router.post('/:cid/product/:pid', async (req, res) => {
    const { cid, pid } = req.params
    
    await cartsManager.addProductToCard(cid, pid);

    res.json({message: 'Product Added'})

});

export default router