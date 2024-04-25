import { ProductManager, Product } from './Class/Product.js'

const productList = new ProductManager('./data/databaseproducts.json')
await productList.getProducts();

// const product1 = new Product('Marolio barato','fideos con grandeza', 950,'urlmock',156758,10)
// const product2 = new Product('Favorita premiun','tallarines', 1250,'urlmock',12222258,20)
// await productList.addProduct(product1)
// await productList.addProduct(product2)
// await productList.deleteProduct(1)

// console.log(await productList.getProducts())