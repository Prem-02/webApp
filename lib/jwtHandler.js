var Promise = require("bluebird");
var jwt = Promise.promisifyAll(require("jsonwebtoken"));
var TOKEN_EXPIRATION_SEC = 24 * 60 * 60;


var genUsrToken = function (user) {
    var options = { expiresIn: TOKEN_EXPIRATION_SEC };
    return jwt.signAsync(user, "securiyIsTheKey", options)
        .then(function (jwtToken) {
            return jwtToken;
        })
        .catch(function (err) {
            return res.json({ code:"0", message:"internal server error"})
        });
};

var verifyUsrToken = function (jwtToken) {
    console.log("called verifyUsrToken",jwtToken)
if(!jwtToken)
{
    console.log("into the if")
    return res.json({ code:"0", message:"Provide the token"})

}
else{
    console.log("into the else")

    return jwt.verifyAsync(jwtToken,"securiyIsTheKey")
    .then(function (tokenPayload) {
        this.tokenPayload = tokenPayload;
        return this.tokenPayload;
    })
    .catch(function (err) {
        // console.log(err)
        return res.json({ code:"0", message:"internal server error"})        });
}
 
};

module.exports = {
    genUsrToken: genUsrToken,
    verifyUsrToken: verifyUsrToken,
};

