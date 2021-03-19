const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cartSchema = new Schema({
    userName:{
        type: String,
        required: true
    },
    cart:{
        items:[
            {
                productId:{type: String, required:true},
                quantity:{type: String, required:true}
            }
        ]
    }
});

module.exports = mongoose.model("Cart",cartSchema);