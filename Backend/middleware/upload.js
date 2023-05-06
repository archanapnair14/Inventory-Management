const path = require('path');
const multer = require('multer');

var storage = multer.diskStorage(
    {
       destination: function(req, file, cb)
       {
        cb(null, 'uploads/')
       }, 
       filename: function(req, file, cb)
       {
        let ext = path.extname(file.originalname)
        cb(null, Date.now() + ext)
       }
    }
)

var upload = multer(
    {
        storage: storage,
        fileFilter: function(req, file, callback)
        {
            if( file.mimetype === 'image/png'|| file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'|| file.mimetype === "application/pdf")
            {
                callback(null,true)
            }
            else
            {
                console.log('Only jpg, jpeg,pdf and png file formats are supported')
                callback(null, false)
            }
        },
        // limits:
        // {
        //     fileSize: 1024 * 1024 * 2   // Max 2 MB file
        // }
    }
)

module.exports = upload