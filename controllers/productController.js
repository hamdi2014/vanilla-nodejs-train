const Product = require('../models/product.model');
const { getPostData } = require('../utils');

// Get all data
async function getProducts(req, res) {
    try {
        const products = await Product.findAll();

        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(products));
    } catch (error) {
        console.log(error)
    };
};

// Get one data
async function getProduct(req, res, id) {
    try {
        const product = await Product.findById(id);
        if (!product) {
            throw new Error("Produc not Found!")
        }
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(product));
    } catch (error) {
        res.writeHead(404, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({message: error.message, code: 404}));
        console.log(error);
    }
}

//Create a data
async function createProduct(req, res) {
    try {
        const body = await getPostData(req);
        
        const product = JSON.parse(body);

        const newProduct = await Product.create(product);
        console.log(newProduct);
        
        res.writeHead(201, {'Content-Type': 'application/json'});
        return res.end(JSON.stringify(newProduct));
    } catch (error) {
        console.log(error)
    };
};
 //Update one data
async function updateProduct(req, res, id) {
    try {
        const product = await Product.findById(id);
        if (!product) {
            throw new Error("Produc not Found!");
        } else {
            const body = await getPostData(req);
            
            const {title, description, price} = JSON.parse(body);
                
            const productUpdate = {
                title: title || product.title,
                description: description || product.description,
                price: price || product.price
            };
            console.log(productUpdate)
        
            res.writeHead(201, {'Content-Type': 'application/json'});
            return res.end(JSON.stringify(await Product.update(productUpdate, id)));
        }
    } catch (error) {
        res.writeHead(404, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({message: error.message, code: 404}));
        console.log(error)
    }
}

//Delet one data
async function removeProduct(req, res, id) {
    try {
        const product = await Product.findById(id);

        if (!product) {
            throw new Error("Product not found!");
        }
        
        res.writeHead(201, {'Content-Type': 'application/json'});
        return res.end(JSON.stringify({
            message: await Product.remove(id),
            deletedProduct: product
        }))
    } catch (error) {
        res.writeHead(404, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({message: error.message, code: 404}));
        console.log(error)
    }

}

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    removeProduct
}