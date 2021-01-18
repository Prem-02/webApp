const mongoose = require('mongoose');
const schema  = mongoose.Schema;
const userSchema = new schema({
firstName:{type:String},
lastName:{type:String},
password: { type: String },
email:{type:String,unique:true},
age:{type:Number},
gender:{type:String,enum:['Male','Female']},
createdAt:{type:Date,default:Date.now},
}) ;
module.exports = mongoose.model('user',userSchema);
