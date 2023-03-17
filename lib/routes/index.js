var userRouter = require('../user/userRoute')
var adminRouter = require('../admin/adminRoute')

module.exports = function (app) {
	app.use('/webApp/v1/api/user', userRouter);
	app.use('/webApp/v1/api/admin', adminRouter);
}

