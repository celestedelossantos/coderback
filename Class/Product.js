import fs from 'fs'

export class Product {
    constructor(title, description, price, thumbnail, code, stock){
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
    }
}

export class ProductManager {
    constructor(path){
        this.id = 1;
        this.products = [];
        this.path = path
    }

    async addProduct(product){
        const isCodeDuplicate = this.products.some(prod => prod.code === product.code)
        const hasInvalidateProperty = Object.values(product).some(property => !property)

        if(isCodeDuplicate) return console.log("Code Duplicate")
        if(hasInvalidateProperty) return console.log("Invalid or incomplete information")

        this.products.push({ ...product, id: this.id })
        this.id++;
        await fs.promises.writeFile(this.path, JSON.stringify({ data: this.products }))
    }

    async getProducts(){
        const response = await fs.promises.readFile(this.path, 'utf-8')
        this.products = [...JSON.parse(response).data]
        return [...this.products]
    }

    getProductById(id){
        const productFinded = this.products.find(prod => prod.id === id)
        return productFinded || console.log('Not found')         
    }

    async updateProduct(id, payload){
        const productsUpdated = this.products.map(prod => {
            if(prod.id === id){
                return {
                    ...prod,
                    ...payload,
                    id
                }
            }
            return prod
        });

        this.products = [...productsUpdated]
        await fs.promises.writeFile(this.path,JSON.stringify({ data: this.products }))
    }

    async deleteProduct(id){
        this.products = this.products.filter(prod => prod.id !== id)
        await fs.promises.writeFile(this.path, JSON.stringify({ data: this.products }))
    }
}