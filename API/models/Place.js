const mongoose = require ('mongoose')

const PlaceSchema = new mongoose.Schema ({
    owner: {type:mongoose.Schema.Types.ObjectId, ref: 'User'},
    title : String,
    address : String,
    photos : [String],
    description : String,
    perks : [String],
    extraInfo: [String],
    visibility: String,
    price: Number,
    views : {type: Number, default: 0},
    sales : {type: Number, default: 0},
    rank: Number
    // extra1 : Number,
    // extra2: Number,
    // maxGuests: Number
})

const PlaceModel = mongoose.model ('Place', PlaceSchema);

module.exports = PlaceModel; 