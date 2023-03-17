const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

const schema  = mongoose.Schema;
const productDetailsSchema = new schema({
productId:{type:String},
productName:{type:String},
productImage:{type:String},
productSize:{type:String},
productColor:{type:String},
productPrice:{type:String},
productQty:{type:String},
addedBy:{type:String},
createdAt:{type:Date,default:Date.now},
}) ;
productDetailsSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('product',productDetailsSchema);