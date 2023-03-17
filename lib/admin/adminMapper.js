const adminConst = require('./adminConstant')
function notAuthorize() {
    return {
        status: false,
        statusCode: adminConst.CODES.FAILURECASE,
        message: adminConst.MESSAGES.notAuthorized,
        data: {}
    }
}

async function productCreatedResponse(data, jwtToken, Password) {
    let newObj = {
        productId: data._id,
        productName: data.productName,
        productImage: data.productImage,
        productSize: data.productSize,
        productColor: data.productColor,
        productPrice: data.productPrice,
        productQty: data.productQty,
        addedBy: data.addedBy,
        createdAt:Date.now()
    }

    var respObj = {
        status: true,
        statusCode: adminConst.CODES.SUCCESSCASE,
        message: adminConst.MESSAGES.productCreateSuccess,
        data: newObj,
    }
    return respObj
}

function productNotFound() {
    return {
        status: true,
        statusCode: adminConst.CODES.FAILURECASE,
        message: adminConst.MESSAGES.prodNotFound,
        data: {}
    }
}
function updatedProductSucess(data) {
    return {
        status: true,
        statusCode: adminConst.CODES.SUCCESSCASE,
        message: adminConst.MESSAGES.prodUpdatedSucess,
        data: data
    }
}

function productRemoved() {
    return {
        status: true,
        statusCode: adminConst.CODES.SUCCESSCASE,
        message: adminConst.MESSAGES.prodRemovedSucess,
        data: {}
    }
}
module.exports = {
    notAuthorize,
    productCreatedResponse,
    productNotFound,
    updatedProductSucess,
    productRemoved
}