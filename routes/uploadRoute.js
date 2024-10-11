const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/uploadController');

router.post('/upload', uploadController.uploadFile);

router.get('/licenses/:licenseId/attachment', uploadController.getAttachmentByLicense);

router.delete('/attachment/:id', uploadController.deleteAttachment);

module.exports = router;
