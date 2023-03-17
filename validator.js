
function verifyToken(req, res, next) {
	var token = req.headers['authorization'];

	if (!token) {
		return res.json({ status: "false", statusCode:"0", message: "please provide the token", data: {} })
	}
	else {
		jwtHndlr.verifyUsrToken(token).then((result) => {
			if (result) {
				next();
			} else {
				return res.json({ status: "false", statusCode:"0", message:"internal serve error", data: {} })
			}
		}).catch(err => { return res.json({ status: "false", statusCode:"0", message:"internal serve error" }) })
	}
}

module.export = {
    verifyToken
}