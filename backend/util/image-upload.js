const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({
    limits: 500000, // 500kb upload size
    destination:(req,file,callback) =>{
        callback(null,"images")
    },
    filename: (req,file,callback)=>{
        callback(null,Date.now() + path.extname(file.originalname))
    },
    fileFilter: (req,file,callback)=>{
        const validTypes = ["image/png","image/jpeg","image/jpg"]
        const isValidFile = validTypes.includes(file.mimetype)
        let error = isValidFile ? null : new Error("Invalid file type")
        callback(error,isValidFile)
    }
})

module.exports = multer({storage})