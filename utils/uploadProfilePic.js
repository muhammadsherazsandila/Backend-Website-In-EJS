const multer = require('multer');

// DISK STORAGE FOR UPLOADING FILES..................

// const path = require('path');
// const crypto = require('crypto');
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './public/images/uploads')
//     },
//     filename: function (req, file, cb) {
//         crypto.randomBytes(12, function (err, bytes) {
//             let fn = "profilePic" + path.extname(file.originalname)
//             cb(null, fn)
//         })
//     }
// })
// const upload = multer({ storage: storage })


// MEMORY STORAGE FOR UPLOADING FILES....................

const storage = multer.memoryStorage();
const upload = multer({storage : storage})


module.exports = {upload};