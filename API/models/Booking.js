const mongoose = require("mongoose")

const bookingSchema = new mongoose.Schema({
    design: {type: mongoose.Schema.Types.ObjectId, required: true, ref:'Place'},
    user: {type:mongoose.Schema.Types.ObjectId, required: true},
    numberOfOrders: Number,
    name: {type: String, required: true},
    phone: {type: String, required: true},
    price: Number,
    deliveryStatus: String,
    address : String,
})

const BookingModel = mongoose.model('Booking', bookingSchema)

module.exports = BookingModel