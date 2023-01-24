let products = require('../data/product.json');
const { v4: uuidv4 } = require('uuid');
const { writeDataToFile } = require('../utils')

function findAll() {
    return new Promise((resolve, reject) => {
        resolve(products);
    });
};

function findById(id) {
    return new Promise((resolve, reject) => {
        const product = products.find(p => p.id === id);
        resolve(product)
    })
}

function create(product) {
    return new Promise((resolve, reject) => {
        const newProduct = {id: uuidv4(), ...product}
        products.push(newProduct);
        writeDataToFile('./data/product.json', products)
        resolve(newProduct)
    })
}

function update(product, id) {
    return new Promise((resolve, reject) => {
        const index = products.findIndex((p) => p.id === id);
        console.log(index)
        // products.splice(index, 1, product);
        //or
        products[index] = {id, ...product}
        writeDataToFile('./data/product.json', products);
        resolve(products[index])
    })
}

function remove(id) {
    return new Promise((resolve, reject) => {
        // const index = products.findIndex((p) => p.id === id);
        // console.log(index);
        // products.splice(index, 1);
        //or
        products = products.filter((p) => p.id !== id)
        writeDataToFile('./data/product.json', products);
        resolve("Product SuccessFully DELETED!!!");
    })
}

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove
}