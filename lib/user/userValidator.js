const userConstant = require('./userConstant')
const jwtHandler = require("../jwtHandler")

function verifyToken(req, res, next) {
	var token = req.headers['authorization'];

	if (!token) {
		return res.json({ status: false, statusCode: userConstant.CODES.FAILURECASE, message: userConstant.MESSAGES.tokenNotPrvided, data: {} })
	}
	else {
		jwtHandler.verifyUsrToken(token).then((result) => {
			if (result) {
				next();
			} else {
				return res.json({ status: false, statusCode: userConstant.CODES.FAILURECASE, message: userConstant.MESSAGES.internalServerError, data: {} })
			}
		}).catch(err => { return res.json({ status: false, statusCode: userConstant.CODES.FAILURECASE, message: userConstant.MESSAGES.inValidToken, data: {} }) })
	}
}

module.exports = {
    verifyToken
}