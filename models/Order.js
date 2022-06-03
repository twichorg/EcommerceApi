const moongose = require('mongoose');

const OrderSchema = moongose.Schema({
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
    ],
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: 'pending'
    },
    addresses: {
        type: Object,
        required: true
    }
},{timestamps: true});

module.exports = moongose.model('Order', OrderSchema);