const moongose = require('mongoose');

const CartSchema = moongose.Schema({
    userID: {
        type: String,
        required: true
    },
    products: [
        {
            productID: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                default: 1
            }
        }
    ]
},{timestamps: true});

module.exports = moongose.model('Cart', CartSchema);