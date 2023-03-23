const mongoose = require("mongoose")

const cartSchema = new mongoose.Schema({
    id : String,
})

const CartModel = mongoose.model('Booking', cartSchema)

module.exports = CartModel