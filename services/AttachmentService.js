
const Attachment = require('../models/attachmentModel');
const { Op } = require('sequelize');

const AttachmentService = {
    async createAttachments(licenseId, uploadedFiles) {
        if (uploadedFiles && uploadedFiles.length > 0) {
            const attachments = uploadedFiles.map((file, index) => ({
                licenseId: licenseId,
                fileName: file.name,
                filePath: file.url,
                order: index + 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            }));

            await Attachment.bulkCreate(attachments);
        }
    },

    async updateAttachments(licenseId, uploadedFiles) {

        if (uploadedFiles && uploadedFiles.length > 0) {
            const filesToDelete = uploadedFiles.filter(file => file.status === 'delete');
            if (filesToDelete.length > 0) {
                const fileIdsToDelete = filesToDelete.map(file => file.id);
                await Attachment.destroy({
                    where: {
                        id: { [Op.in]: fileIdsToDelete }
                    }
                });
            }

            const filesToAdd = uploadedFiles.filter(file => file.status === 'new');
            if (filesToAdd.length > 0) {
                const attachments = filesToAdd.map((file, index) => ({
                    licenseId: licenseId,
                    fileName: file.name,
                    filePath: file.url,
                    order: index + 1,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                }));
                await Attachment.bulkCreate(attachments);
            }

        } else {
            await Attachment.destroy({
                where: {
                    licenseId: licenseId
                }
            });
        }
    }
};

module.exports = AttachmentService;
