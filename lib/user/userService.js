const user_schema = require('../schema/userSchema')
const product_schema = require('../schema/productDetails')
const userConst = require('../user/userConstant')
const userDao = require('./userDao')
const userMapper = require('./userMapper')
const jwtHandler = require('../jwtHandler')
const bcrypt = require('bcryptjs');

async function createUser(req,res)
{
     return user_schema.findOne({ $or: [{ "emailId": req.body.emailId }, { "contactNumber": req.body.contactNumber }]}).then((userDetails) => {
            if (userDetails) {
                 return { status: false, statusCode: userConst.CODES.FAILURECASE, message: userConst.MESSAGES.emailOrNumExists }
            }
            else {
                var pass = bcrypt.hashSync(req.body.password, 10)
            
                req.body.password = pass
                let obj = req.body;
                return userDao.createUser(obj).then(async (data) => {
                let token = await jwtHandler.genUsrToken({ id: data._id })
                  if(data)
                  {
                    return userMapper.createSucessResp(data, token).then(async(resp) => {
                        return  resp
                    }).catch(err => { return { status: false, statusCode: userConst.CODES.FAILURECASE, message: userConst.MESSAGES.internalServerError,err:err } }) 
                  }
                }).catch(err => {
                    return { status: false, statusCode: userConst.CODES.FAILURECASE, message: userConst.MESSAGES.registerFailure,err:err }
                })
            }
        }).catch(err => {return { status2: false, statusCode: userConst.CODES.FAILURECASE, message: userConst.MESSAGES.registerFailure,err:err }
        })
    }
   

    function userLogin(req, res) {
        let userData = req.body.email
    
        //userExitsOrNot,used for checking userExits or not with entered emailOrContact Details ...
        return userDao.userExitsOrNot(userData).then(async (data) => {
            console.log("Data",data)
                if (data) {
                    console.log("Difata",data)

                        /*Verify entered password*/
                        const match = await bcrypt.compare(req.body.password, data.password);
                        console.log("match",match)

                        if (match) {
                            let mdata = req.body.fcmToken
                            let did = data._id
                            if (mdata) {
    
                                let { fcmToken } = await userDao.updateMobileData(did, mdata);
                                data.fcmToken = fcmToken
    
                                /*genUsrToken,generate user token*/
                                return jwtHandler.genUsrToken({ id: data._id }).then((jwt) => {
    
                                    /*loginSuccess,executed while user makes request with correct credencial*/
                                    return userMapper.loginSuccess(data, jwt)
    
                                }).catch(err => { return userMapper.internalServerError() })
                            }
                            else {
    
                                /*genUsrToken,generate user token*/
                                return jwtHandler.genUsrToken({ id: data._id }).then((jwt) => {
                                    /*loginSuccess,executed while user makes request with correct credencial*/
                                    return userMapper.loginSuccess(data, jwt)
    
                                }).catch(err => { return userMapper.internalServerError() })
                            }
    
    
                        }
                        else {
                            /*incorrectPassword,executed while user trying to login with incorrect password*/
                            return userMapper.incorrectPassword()
                        }
                    } else {
                        return userMapper.userNotFound()
                    }
                
            
       
        })
    }
  
async function createOrder(req,res)
    {
        return user_schema.findById({ _id: req.params.id }).then((userDetails) => {
            if(userDetails)
            {
                return product_schema.findById({ _id: req.params.pid }).then((prodDetails) => {
                    
                    if (!prodDetails) {
                            return { status: false, statusCode: userConst.CODES.FAILURECASE, message: userConst.MESSAGES.prodNotFound }
                        }
                        else {

                             let orderObj = {
                                productId: prodDetails._id,
                                productName: prodDetails.productName,
                                productImage: prodDetails.productImage,
                                productSize: prodDetails._id,
                                productColor: prodDetails.productColor,
                                productPrice:prodDetails.productPrice,
                                productQty: prodDetails.productQty,
                                orderedBy: req.params.id,
                                userEmailId:userDetails.emailId,
                                createdAt:prodDetails.createdAt, 
                            }

                            return userDao.createOreder(orderObj).then(async (data) => {
                                if(data)
                              {
                                return userMapper.placeOderSucess(data).then(async(resp) => {
                                    return  resp
                                }).catch(err => { return { status: false, statusCode: userConst.CODES.FAILURECASE, message: userConst.MESSAGES.internalServerError,err:err } }) 
                              }
                            }).catch(err => {
                                return { status: false, statusCode: userConst.CODES.FAILURECASE, message: userConst.MESSAGES.registerFailure,err:err }
                            })
                        }
                    }).catch(err => { return { status: false, statusCode: userConst.CODES.FAILURECASE, message: userConst.MESSAGES.internalServerError,err:err } }) 
                }
            else{
                    return userMapper.userNotFound();
            }
           
        })
        
        }
       
module.exports={
    createUser,
    createOrder,
    userLogin
}