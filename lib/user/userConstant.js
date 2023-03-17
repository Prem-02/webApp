const messages ={
    emailOrNumExists: 'User Exists with This Emailid Or ContactNumber',
    internalServerError: 'Internal Server Error',
    createSuccess: 'Created Successfully',
    tokenNotPrvided: "Please Provide Token.",
    inValidToken: "Invalid Access Please Login Again",
    incorrectid: "User Not Found",
    prodNotFound:"Product Not Found",
    LogInSUCCESSCASE:"Logged in sucessfully"

}

const codes = {
    SUCCESS: 200,
    BADREQUEST: 400,
    FORBIDDEN: 403,
    NOTFOUND: 404,
    INTRNLSRVRERR: 500,
    FAILURECASE: 0,
    SUCCESSCASE: 1
}

module.exports = {
    MESSAGES:messages,
    CODES:codes
}