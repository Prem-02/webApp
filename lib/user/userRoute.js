const userRouter = require('express').Router();
const userService = require('./userService')
var validate = require('./userValidator')

/**
 * this route is used for create users.
 */
userRouter.route("/createUser")
    .post((req, res) => {
        userService.createUser(req, res).then((data) => {
            return res.json(data)
        })
    })


/**
 * Login Request Route ...
 */

userRouter.route('/userLogin')
    .post((req, res) => {
        userService.userLogin(req, res).then((result) => {
            return res.json(result)
        }).catch((err) => {
            return res.json(err)
        })
    })
/**
 * this route is used for place Order.
 */
userRouter.route("/createOrder/:id/:pid")
    .post([validate.verifyToken],(req, res) => {
        userService.createOrder(req, res).then((data) => {
            return res.json(data)
        })
    })
    
module.exports = userRouter;