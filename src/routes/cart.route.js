import { Router } from 'express';
import { CartManager } from '../Class/Cart';

const router = Router();
const cartsManager = new CartManager('./src/data/databasecarts.json');

router.use(express.json())

router.post('/', async (req, res) => {
    const newCart = req.body
    await cartsManager.newCart(newCart)

    res.status(201).json({ message: 'Save is successfully'})
});

router.get('/:cid', async (req, res) => {
    const { cid } = req.params

    const productList = await cartsManager.getCartById(cid);

    if(!productList) res.status(404).json({ message: 'Not Found' })

    res.json(productList)
});

router.post('/:cid/product/:pid', async (req, res) => {
    const { cid, pid } = req.params

    await cartsManager.addProductToCard(cid, pid);

    res.json({message: 'Producto Agregado'})

});

export default router