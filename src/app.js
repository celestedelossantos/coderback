import express from 'express';
import ProductRouter from './routes/products.route.js'
import CartRouter from './routes/cart.route.js'

const port = process.env.PORT || 8080;
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/product/', ProductRouter);
app.use('/api/cart/', CartRouter);

app.listen(port, () => {
    console.log(`Connect server to port ${port}`)
})