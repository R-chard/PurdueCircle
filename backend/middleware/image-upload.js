const multer = require("multer")
const path = require("path")

module.exports = multer({
    storage: multer.diskStorage({}),
    limits: 500000, // 500kb upload size
    fileFilter: (req,file,callback)=>{
        const validTypes = ["image/png","image/jpeg","image/jpg"]
        const isValidFile = validTypes.includes(file.mimetype)
        let error = isValidFile ? null : new Error("Invalid file type")
        callback(error,isValidFile)
    }
})