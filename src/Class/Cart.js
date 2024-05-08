import fs from 'node:fs/promises';
import { v4 as uuidv4 } from 'uuid';

export class CartManager {
    constructor(path){
        this.path = path
        this.carts = []
    }

    async getCarts(){
        const response = await fs.readFile(this.path, 'utf-8')
        this.carts = [...JSON.parse(response).data]
        return [...this.products]
    }

    async newCart(cart){
        this.carts = this.getCarts();
        this.carts.push({ id: uuidv4(), products: cart });
        await fs.writeFile(this.path, JSON.stringify({ data: this.carts }))
    }

    async getCartById(id){
        this.carts = this.getCarts();
        const cartFinded = this.carts.find( cart => cart.id === id)

        return cartFinded || console.log('Not Found') 
    }

    async addProductToCard(id, productId){
        this.carts = this.getCarts();
        const cardsUpdated = this.carts.map((cart)=>{
            if(cart.id === id){
                const indexProd = cart.products.indexOf(prod => prod.id === productId);
                if(indexProd === -1){
                    cart.products.push({ id: productId, quantity: 1 })
                    return cart;
                }
                cart.products[indexProd] = { ...cart.products[indexProd], quantity: cart.products[indexProd].quantity + 1 }
                return cart;
            }
            return cart;
        })
        this.carts = [...cardsUpdated]
        await fs.writeFile(this.path,JSON.stringify({ data: this.carts }))
    }

}