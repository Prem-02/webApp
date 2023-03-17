const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

const schema  = mongoose.Schema;
const orderSchema = new schema({
productId:{type:String},
productName:{type:String},
productImage:{type:String},
productSize:{type:String},
productColor:{type:String},
productPrice:{type:String},
productQty:{type:String},
orderedBy:{type:String},
userEmailId:{type:String},
userContactNumber:{type:String},
typeOfPayment:{type:String,enum:['COD','ONLINE'],default:"COD"},
statusOfOrder:{type:String,enum:['INPROGRESS','DELIVERED','CANCELLED','RETURNED'],default:"INPROGRESS"},
orederedAt:{type:Date,default:Date.now},
}) ;
orderSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('order',orderSchema);