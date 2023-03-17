const userConst = require('./userConstant')
async function createSucessResp(data, jwtToken) {
    let newObj = {
        userId: data._id,
        userName: data.userName,
        emailId: data.emailId,
        userType:data.userType,
        contactNumber: data.contactNumber,

    }

    var respObj = {
        status: true,
        statusCode: userConst.CODES.SUCCESSCASE,
        message: userConst.MESSAGES.createSuccess,
        data: newObj,
        token: jwtToken,
    }

    return respObj
}

function userNotFound() {
    return {
        status: true,
        statusCode: userConst.CODES.FAILURECASE,
        message: userConst.MESSAGES.incorrectid,
        data: {}
    }
}

function internalServerError() {
    return {
        status: false,
        statusCode: userConst.CODES.FAILURECASE,
        message: userConst.MESSAGES.internalServerError,
        data: {}
    }
}
function incorrectPassword() {
    var respObj = {
        "status": false,
        "statusCode": 0,
        "message": "Please Enter Correct Password",
    }
    return respObj;
}

async function placeOderSucess(data) {
    let newObj = {
       
        productId:data.productId,
        productName:data.productName,
        productImage:data.productImage,
        productSize:data.productSize,
        productColor:data.productColor,
        productPrice:data.productPrice,
        productQty:data.productQty,
        userEmailId:data.userEmailId,
        orderedBy:data.orderedBy,
        orederedAt:data.orederedAt,
        typeOfPayment:data.typeOfPayment,
        statusOfOrder:data.statusOfOrder 
    }
    
    var respObj = {
        status: true,
        statusCode: userConst.CODES.SUCCESSCASE,
        message: userConst.MESSAGES.createSuccess,
        data: newObj,
    }

    return respObj
}
/**
 * login success responce   ...
 */
function loginSuccess(resp, jwt) {
    console.log("Into  the login success", resp, jwt)
    var respObj = {

        status: true,
        statusCode: userConst.CODES.SUCCESSCASE,
        message: userConst.MESSAGES.LogInSUCCESSCASE,
        data: resp,
        token: jwt,
    }
    return respObj;
}
module.exports = {
    createSucessResp,
    internalServerError,
    userNotFound,
    placeOderSucess,
    loginSuccess,
    incorrectPassword

}