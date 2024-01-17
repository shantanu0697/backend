const fs  = require('fs');
const model = require('../model/product');
const { default: mongoose } = require('mongoose');
const Product= model.Product;
exports.getall = (req, res) => {
    Product.find({stock:{$gt:500}})
        .then(products => res.json(products))
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        });
};
exports.get = (req, res) => {
    console.log('ok');
    const id = +req.params.id;
    Product.findOne({ _id: id })
        .then(product => res.json(product))
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        });
};

 exports.create = (req, res) => {
    // console.log('Request Body:', req.body);
    const product = new Product(req.body);
    product.save()
        .then(doc => {
            // console.log({ err: null, doc });
            res.json(doc);
            // console.log('Request Body:', req.body);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        });
};

exports.put = (req, res) => {
    // console.log('Request Body:', req.body);
    const id = req.params.id;
    const updateData = req.body;
    Product.findOneAndReplace( {_id:id} ,updateData,  { new: true })
    .then(doc => {
        if (!doc) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(doc);
        console.log('Request Body:', req.body);
    })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        });
};

exports.patch = (req, res) => {
    const id = req.params.id;
    Product.findOneAndUpdate({ _id: id }, { $set: req.body }, { new: true })
        .then(() => res.status(201).json())
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        });
};

exports.del = (req, res) => {
    const id = req.params.id;

    // Check if id is a valid ObjectId before querying the database
    // if (!mongoose.Types.ObjectId.isValid(id)) {
    //     return res.status(400).json({ error: 'Invalid ObjectId' });
    // }

    Product.findOneAndDelete({ _id: id })
        .then(product => {
            if (!product) {
                return res.status(404).json({ error: 'Product not found' });
            }
            res.status(201).json(product);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        });
};
