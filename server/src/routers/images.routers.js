const router = require('express').Router();
const { getAllImages, uploadImage, uploadMiddleware, removeImage, getImageById } = require('../controllers/images.ctl');


router.get('/all', getAllImages);
router.get('/:id', getImageById);
router.post('/upload', uploadMiddleware ,uploadImage);
router.delete('/remove/:id', removeImage);

module.exports = router;