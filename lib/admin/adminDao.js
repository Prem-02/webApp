const product_schema = require('../schema/productDetails')
const user_schema = require('../schema/userSchema')

function getUserData(id) {
    let query = {
        _id: id
    }
    return user_schema.findById(query)
}
function createProduct(obj){
    let product =  new product_schema(obj)
    return product.save(product)
}
function getProductData(id) {
    let query = {
        _id: id
    }
    return product_schema.findById(query)
}
function updateData(id, obj) {
    let query = {
        _id: id
    }

    let update = {}
    update['$set'] = obj;

    let option = {}
    option.new = true
    return product_schema.findOneAndUpdate(query, update, option)
}
function deleteProdData(id) {
    let query = {
        _id: id
    }
    return product_schema.findOneAndDelete(query)
}
async function paginate(req) {
    let query1 = {}
    let query2 = {}

    query1['$and'] = [];
    query2['$and'] = [];
   

   

    let options = {}
    options.offset = parseInt(req.body.start)
    options.limit = parseInt(req.body.length)

    if (req.body.search) {

        query1['$and'].push({
            $and: [
                {
                    $or: [{ 'productName': { '$regex': new RegExp(req.body.search.toString(), "ig") } },
                    { 'productPrice': { '$regex': new RegExp(req.body.search.toString(), "ig") } },
                    { 'productQty': { '$regex': new RegExp(req.body.search.toString(), "ig") } }]
                }]
        })
    }

   

    if (query1['$and'].length > 0) {
        return await product_schema.paginate(query1, options);
    }
    else {
        return await product_schema.paginate(query2, options);
    }

    // let filter = req.body.search;
    // let query = {}
    // let options = {}
    // options.offset = parseInt(req.body.start)
    // options.limit = parseInt(req.body.length)
    // console.log("filter",filter)

    // if (req.body.search) {
    //     query["$or"] = [
    //         {
    //             "productName": { $regex: filter, $options: 'i' }
    //         },
    //         {
    //             "productPrice": { $regex: filter, $options: 'i' }
    //         }
    //     ]
    // }
    // options.select = '_id productName productImage productSize productPrice productQty productColor'
    // console.log("queryqueryqueryqueryquery",query)
    // console.log("optionsoptionsoptionsoptionsoptions",options)

    // return product_schema.paginate(query, options);
}
module.exports= {
    getUserData,
    createProduct,
    getProductData,
    updateData,
    deleteProdData,
    paginate
}
