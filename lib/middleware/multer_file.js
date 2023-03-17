var fs = require('fs')
var path = require('path')
var multer = require('multer');
var securePin = require("secure-pin");
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './img');
    },
    filename: function (req, file, callback) {
        let id = req.params.id;
        let file_name = id;
        let updateURl = "http://" + req.hostname + process.cwd() + "/img/" + file_name
        req.newFile_name.push(updateURl);
        callback(null, file_name);
    }
 
});
var upload = multer({
    storage: storage,
    fileFilter: function (req, file, callback) {
        checkFileType(file, callback)
    }
}).array('img', 5);


var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './img');
    },
    filename: function (req, file, callback) {
        var randomNum = securePin.generatePinSync(10);
        let updateURl = "http://" + req.hostname + process.cwd() + "/img/" + randomNum
        req.newFile_name.push(updateURl);
        callback(null, randomNum);
    }

});


function checkFileType(file, callback) {
    const fileTypes = /jpeg|jpg|png|gif/;
    const extName = fileTypes.test(path.extname(file.originalname).toLocaleLowerCase());
    if (extName) {
        return callback(null, true);
    }
    else {
        callback('Error:Images only!')
    }
}


module.exports = {
    upload,
}