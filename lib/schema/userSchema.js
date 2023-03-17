const mongoose = require('mongoose');
const schema  = mongoose.Schema;
const userSchema = new schema({
userName:{type:String},
emailId: { type: String },
contactNumber: { type: String },
userType:{type:String,enum:['ADMIN','USER'],default:"USER"},
accountBal:{type:Number,default:0},
password:{type:String},
createdAt:{type:Date,default:Date.now},
});
module.exports = mongoose.model('user',userSchema);