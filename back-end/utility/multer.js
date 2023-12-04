const multer = require('multer')
const storage = multer.diskStorage({
    destination: (request, file, cb) => {
        cb(null, "../back-end/public/uploads");
    },
    filename: (request, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
})
const upload = multer({ storage });
module.exports = upload;