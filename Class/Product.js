class Product {
    constructor(title, description, price, thumbnail, code, stock){
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
    }
}

class ProductManager {
    constructor(){
        this.id = 1;
        this.products = []
    }

    addProduct(product){
        const isCodeDuplicate = this.getProducts.some(prod => prod.code === product.code)
        const hasInvalidateProperty = Object.values(product).some(property => !property)

        if(isCodeDuplicate) return console.log("Code Duplicate")
        if(hasInvalidateProperty) return console.log("Invalid or incomplete information")

        this.products.push({ ...product, id: this.id })
        this.id++;
    }

    getProducts(){
        return [...this.products]
    }

    getProductById(id){
        const productFinded = this.products.find(prod => prod.id === id)
        return productFinded || console.log('Not found')         
    }
}