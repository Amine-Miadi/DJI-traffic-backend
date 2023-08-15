const {Storage} = require('@google-cloud/storage')
const path = require('path')

const gc = new Storage({
    keyFilename: path.join(__dirname, '../concise-emblem-395909-6c43cd09030d.json'),
    projectId: 'concise-emblem-395909'
})

const images_bucket = gc.bucket('concise-emblem-395909.appspot.com')

module.exports = images_bucket