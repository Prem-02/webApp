var adminRouter = require('express').Router();
const adminService = require("./adminService")

/**
 * this route is used for create Products.
 */
adminRouter.route("/createProduct/:id")
    .post((req, res) => {
        adminService.createProduct(req, res).then((data) => {
            return res.json(data)
        })
    })

/**
 * this route is used for edit product where id is the  userId and pid is the productId.
 */
adminRouter.route("/editProduct/:id/:id1")
    .put([], (req, res) => {
        adminService.editProduct(req, res).then((data) => {
            return res.json(data)
        })
    })
/**
 * this route is used for delete product where uid is the  userId and pid is the productId.
 */
adminRouter.route("/deleteProduct/:uid/:pid")
    .delete([], (req, res) => {
        adminService.deleteProduct(req, res).then((data) => {
            return res.json(data)
        })
    })
    
/**
 * this route is used for getting all product.
 */
adminRouter.route("/getAllProduct")
    .get((req, res) => {
        adminService.getAllProduct(req, res).then((data) => {
            return res.json(data)
        })
    })

/**
 * this route is used for upload image.
 */
adminRouter.route("/imageUpload/:id")
    .post((req, res) => {
        adminService.imageUpload(req, res).then((data) => {
            return res.json(data)
        }).catch(e => {
            return res.json(e);
        })
    })

module.exports = adminRouter;
