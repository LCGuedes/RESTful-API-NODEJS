let Products = require("../data/data.json");
const {v4: uuidv4} = require("uuid");
const {writeDataToFile} = require("../utils");

// get all data
const findAll = () => {
    return new Promise((resolve, reject) => {
        resolve(Products);
    });
};

// get the data by id 
const findById= id => {
    return new Promise((resolve, reject) => {
        const product = Products.find( e => product.id === id);
        resolve(product);
    });
};
// 
const create = product => {
    return new Promise((resolve, reject) => {
        const newProduct = {id: uuidv4(), ...product};
        Products.push(newProduct);
        writeDataToFile("./data/products.json", Products);
        resolve(newProduct);
    });
};

const update = (id, productData) => {
    return new Promise((resolve, reject) => {
        const index = Products.findIndex((p) => p.id === id);
        Products[index] = {id,...productData};
        writeDataToFile("./data/products.json", Products);
        resolve(Products[index]);
    });
};

const remove = id => {
    return new Promise((resolve, reject) => {
        const Products = Products.filter(p => p.id !== id);
        writeDataToFile("./data/products.json", Products);
        resolve();
    });
};

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove
};