const moongose = require('mongoose');

const ProductSchema = moongose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    desc: {
        type: String,
        required: true       
    },
    img: {
        type: String,
        required: true
    },
    categories: {
        type: Array,
        required: true
    },
    size:{
        type: String
    },
    color:{
        type: String
    },
    price:{
        type: Number,
        required: true
    }
},{timestamps: true});

module.exports = moongose.model('Product', ProductSchema);