const messages ={
    notAuthorized: 'Dont have access',
    internalServerError: 'Internal Server Error',
    createSuccess: 'User Created Successfully',
    tokenNotPrvided: "Please Provide Token.",
    inValidToken: "Invalid Access Please Login Again",
    incorrectid: "User Not Found",
    productCreateSuccess:"Created Sucessfully",
    creationFailure: 'An Error Occurred while Creating New Product',
    prodNotFound:"Product Not Found",
    prodUpdatedSucess:"Product updated Sucessfully",
    prodRemovedSucess:"Product Removed Sucessfully",
    noDataFound: "No Data Found",
    getUserData: 'Success',
    imageUpload: 'Image Uploaded Successfully',
    ImageUploadFailure: "Please Choose Image",
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