const multer = require('multer');
const path = require('path');
const Attachment = require('../models/attachmentModel');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const fileNameWithoutExtension = path.parse(file.originalname).name;
        cb(null, fileNameWithoutExtension + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage }).single('file');

exports.uploadFile = async (req, res) => {
    upload(req, res, async (err) => {
        console.log(req.file)
        if (err) {
            console.error('Multer Error:', err); // เพิ่มการดีบัค
            return res.status(500).send({ message: 'Error uploading file' });
        }

        try {
            res.status(201).send({
                fileName: req.file.filename,
                filePath: req.file.path,
                type: req.file.type
            });
        } catch (error) {
            console.error('Error saving file information:', error); // เพิ่มการดีบัค
            res.status(500).send({ message: 'Error saving file information' });
        }
    });
};


exports.getAttachmentByLicense = async (req, res) => {
    try {
        const { licenseId } = req.params;
        const files = await Attachment.findAll({ where: { licenseId }, order: [['order', 'ASC']] });
        res.status(200).send(files);
    } catch (error) {
        res.status(500).send({ message: 'Error fetching files' });
    }
};

exports.deleteAttachment = async (req, res) => {
    try {
        const { id } = req.params;
        const file = await Attachment.findByPk(id);

        if (!file) {
            return res.status(404).send({ message: 'File not found' });
        }

        await file.destroy();
        res.status(200).send({ message: 'File deleted successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Error deleting file' });
    }
};
