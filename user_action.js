const model = require('./model');
var bcrypt = require('bcryptjs');
   

module.exports = {



/**
 * user can register with the required details by system..
 * */

   createUser: function (req, res) {
      model.findOne({ "email": req.body.email }, (err, userDetails) => {
         if (err) {
            return res.json({ code: "0", status: "false", message: "internal Server Error" })
         }
         else if (userDetails) {
            return res.json({code:"0",status:"false",message:"User Exists With This EmailId"})
  
   }
   else{
         req.body.password = bcrypt.hashSync(req.body.password, 10)
         var Model = new model(req.body);
         Model.save((err,data)=>{

         if(err)return res.json({code:"0",status:"false",message:"Error in creating new user",err:err})
         else
         return res.json({code:"1",status:"true",message:"User created successfully.",data:data})
      })
      }
    })
      
   },





/**
 * user can loggedin using correct Email_id and Password..
*/

   userLogin:function(req,res){
      model.findOne({"email":req.body.email},(err,userDetails)=>{
         if(err)
         {
            return res.json({ code: "0", status: "false", message: "internal Server Error" })

         }
         else if(userDetails)
         {
            const match =bcrypt.compareSync(req.body.password, userDetails.password);
            console.log("match",match)
            if (match) {
            return res.json({code: "1", status: "true", message: "Logged In Successfully"})
            }
            else {
            return res.json({code: "0", status: "false", message: "Please Enter The Correct Password"})
            }
            
         }
         else{
            return res.json({code: "0", status: "false", message: "User Not Found"})
         }
      })
   },





/***
 *getting selected user details..
 **/ 

 getUserDetails:function(req,res){
      model.findById({_id:req.params.id},(err,userDetails)=>{
         if(err)
         {
            return res.json({ code: "0", status: "false", message: "internal Server Error" })

         }
         else if(userDetails)
         {
             return res.json({code: "1", status: "true", message:"userDetail Success",data:userDetails})
         }
         else{
            return res.json({code: "0", status: "false", message: "User Not Found"})
         }
      })
   },





/**
 *  edit loggedin user details..
 * */

   editUserDetails:function(req,res){
      model.findByIdAndUpdate(req.params.id,{$set:req.body},(err,userDetails)=>{
         if(err)
         {
            return res.json({ code: "0", status: "false", message: "internal Server Error" })

         }
         else if(userDetails)
         {
            return res.json({ code: "1", status: "true", message: "Updated sucessfully",data:userDetails })

         }
         else{
            return res.json({ code: "0", status: "false", message: "User Not Found" })

         } 
      })
   },





/**
 * remove selected user from the system..
 **/ 

   removeUserDetails:function(req,res){
      model.findByIdAndDelete(req.params.id,(err,userDetails)=>{
         if(err)
         {
            return res.json({ code: "0", status: "false", message: "internal Server Error" })
         }
         else{
            return res.json({ code: "1", status: "true", message: "User Deleted Sucessfully"})
         }
      })
   },


   getallUser:function(req,res){
      model.find((err,data)=>{
         if(err)
         {
            return res.json({ code: "0", status: "false", message: "internal Server Error" })
         }
         else{
       
            return res.json(data)
         }
      })
   }


}

