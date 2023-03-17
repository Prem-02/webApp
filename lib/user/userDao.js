const userSchema = require('../schema/userSchema')
const orderSchema = require("../schema/order")

function createUser(obj){
    let user =  new userSchema(obj)
    return user.save(user)
}
function createOreder(obj){
    let order =  new orderSchema(obj)
    console.log("order",order)
    return order.save(order)
}
function userExitsOrNot(userData) {
    console.log("Print the userExits or not function ", userData)
    let query = {
        $or: [
            { "emailId": userData },
            { "contactNumber": userData }
        ]
    }
    console.log("query ", query)

    return userSchema.findOne(query)
}
function updateMobileData(did, mdata) {
    console.log("*called print the req data>>>>>*", did, mdata)
    let query = {
        _id: did
    }

    let update = {}
    update['$set'] = { fcmToken: mdata }

    let option = {}
    option.new = true

    console.log("*update*", update)

    console.log("*called print the req data>>>>>*", mdata)

    return userModel.findOneAndUpdate(query, update, option)
}
module.exports={
    createUser,
    createOreder,
    userExitsOrNot,
    updateMobileData
}