const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
    title: String,
    description: String,
    rating: {type:Number, min:[0,'wrong'], max:[5,'right']},
    stock: Number,
    brand: String,
});

exports.Product = mongoose.model('Product', productSchema);
