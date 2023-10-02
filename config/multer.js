const path = require('path')
const multer = require('multer')
const multerGoogleStorage = require('multer-google-storage')

const uploadHandler = multer({
    storage: multerGoogleStorage.storageEngine({
        autoRetry: true,
        bucket: 'concise-emblem-395909.appspot.com',
        projectId: 'concise-emblem-395909',
        keyFilename: path.join(__dirname, '../concise-emblem-395909-6c43cd09030d.json'),
        contentType: (req,file) =>{
            return "image/jpeg"
        },
        filename: (req, file, cb) => {
            cb(null, `${file.originalname}`)
        }
    })
})

module.exports = uploadHandler