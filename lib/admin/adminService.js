const user_schema = require('../schema/userSchema')
const product_schema = require('../schema/productDetails')
const adminConst = require('../admin/adminConstant')
const adminDao = require('../admin/adminDao')
const adminMapper = require('../admin/adminMapper')
const jwtHandler = require('../jwtHandler')
const userMapper = require('../user/userMapper')
const fileUtil = require('../middleware/multer_file')
async function createProduct(req,res)
{
    let { id } = req.params;
	return adminDao.getUserData(id).then(userData => {
		if (userData.userType == "USER") {
        return adminMapper.notAuthorize()
    } else {
        let obj = req.body;
        obj.addedBy = req.params.id
        return adminDao.createProduct(obj).then(async (data) => {
          if(data)
          {
            return adminMapper.productCreatedResponse(data).then(async(resp) => {
                return  resp
            }).catch(err => { return { status1: false, statusCode: userConst.CODES.FAILURECASE, message: userConst.MESSAGES.internalServerError,err:err } }) 
          }
        }).catch(err => {
            return { status2: false, statusCode: userConst.CODES.FAILURECASE, message: userConst.MESSAGES.creationFailure,err:err }
        })
		}
	}).catch(err => {
		return userMapper.internalServerError()
	})
}
  
function editProduct(req, res) {
    let  id  = req.params.id;
	return adminDao.getUserData(id).then(userData => {
		if (userData.userType == "USER") {
        return adminMapper.notAuthorize()
    } else {
	let prodid  = req.params.id1;
	return adminDao.getProductData(prodid).then(productData => {
		if (productData) {
            let reqUpdatedData = req.body
			return adminDao.updateData(prodid, reqUpdatedData).then(updatedData => {
				return adminMapper.updatedProductSucess(updatedData)
			})
		} else {
			return adminMapper.productNotFound()
		}
	}).catch(err => {
		return userMapper.internalServerError()
	})
}
})
}

function deleteProduct(req, res) {

	let productid = req.params.pid
	let userid = req.params.uid
	return adminDao.getUserData(userid).then(userData => {
		if (userData.userType == "USER") {
        return adminMapper.notAuthorize()
    } else {
	return adminDao.deleteProdData(productid).then((result) => {

		if (result) {

            return adminMapper.productRemoved()
		}
		else {
            return adminMapper.productNotFound()
        }
	}).catch(err => {
        console.log("Err",err)
		return userMapper.internalServerError()
	})
}
    })
}

function getAllProduct(req, res) {

	return adminDao.paginate(req).then(data => {
		if (data.docs.length == 0) {
			return { code: adminConst.CODES.NOTFOUND, message: adminConst.MESSAGES.noDataFound, data: data }
		}
		else {
			return { code: adminConst.CODES.SUCCESS, message: adminConst.MESSAGES.getUserData, data: data }
		}
	}).catch(err => {
		return { code: adminConst.CODES.INTRNLSRVRERR, message: adminConst.MESSAGES.internalServerError }
	})
}

async function imageUpload(req, res) {
	let id = req.params.id;
	req.newFile_name = [];
	return new Promise(function (resolve, reject) {
		fileUtil.upload(req, res, function (err, data) {
			if (err) {
				reject({ status: false, statusCode: userConst.CODES.INTRNLSRVRERR, message: userConst.MESSAGES.internalServerError })
			}
			else {
				resolve({ status: true, statusCode: userConst.CODES.SUCCESSCASE, message: userConst.MESSAGES.imageUpload, data: req.newFile_name[0] })
			}
		});
	})

}
module.exports={
    createProduct,
    editProduct,
    deleteProduct,
    getAllProduct,
    imageUpload
}