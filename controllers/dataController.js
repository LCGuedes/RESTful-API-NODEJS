const productModel = require("../models/productModel");
const {getPostData} = require("../utils");

//@desc     get all products
//@route    GET api/products
const getProducts = async (req, res) => {
    try {
        const products = await productModel.findAll();
        res.writeHead(200, {"content-Type": "aplication/json"});
        res.end(JSON.stringify(products));

    } catch (error) {
        console.log(error);
    };
};

//@desc     get single products
//@route    GET api/products:id
export const getProduct = async (req, res, id) => {
    try {
        const product = await productModel.findById(id);

        if(!product) {
            res.writeHead(404, {"content-Type": "aplication/json"});
            res.end(JSON.stringify({ message: "product not found"}));
        } else {
            res.writeHead(200, {"Content-type": "application/json"});
            res.end(JSON.stringify(product));
        };

    } catch (error) {
        console.log(error);
    };
};

//@desc     create a product
//@route    POST /api/products
const createProduct = async (req, res) => {
    try {

        const data = await getPostData(req);

        const {title, description, price} = JSON.parse(data);

        const product = {
            title,
            description,
            price
        };
            
        const newProduct = await productModel.create(product);

        res.writeHead(201, {"content-Type": "aplication/json"});
        return res.end(JSON.stringify(newProduct));

    } catch (error) {
        console.log(error);
    };
};

//@desc     update single products
//@route    PUT api/products:id
export const updateProduct = async (req, res, id) => {
    try {
        const product = await productModel.findById(id);

        if(!product) {
            res.writeHead(404, {"content-Type": "aplication/json"});
            res.end(JSON.stringify({ message: "product not found"}));
        } else {

            const data = await getPostData(req);

            const {title, description, price} = JSON.parse(data);

            const productData = {
                title: title || product.title,
                description: description || product.description,
                price: price || product.price
            };
            
            const uptProduct = await productModel.update(id, productData);

            res.writeHead(200, {"content-Type": "aplication/json"});
            return res.end(JSON.stringify(uptProduct));
        };

    } catch (error) {
        console.log(error);
    };
};

//@desc     delete single products
//@route    DELETE api/products:id
export const deleteProduct = async (req, res, id) => {

    try {
        const product = await productModel.findById(id);

        if(!product) {
            res.writeHead(404, {"content-Type": "aplication/json"});
            res.end(JSON.stringify({ message: "product not found"}));
        } else {
            await productModel.remove(id);
            res.writeHead(200, {"Content-type": "application/json"});
            res.end(JSON.stringify({message: `Product ${id} removed`}));
        };

    } catch (error) {
        console.log(error);
    };
};

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}

