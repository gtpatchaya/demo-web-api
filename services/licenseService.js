const License = require('../models/licenseModel');
const GroupLicense = require('../models/groupLicenseModel');
const Department = require('../models/departmentModel');
const moment = require('moment');
const Attachment = require('../models/attachmentModel')
const { Op } = require('sequelize');

const getAllLicenses = async (filters, offset, limit) => {
  const licenses = await License.findAll({
    where: filters,
    offset,
    limit,
    include: [
      {
        model: Attachment,
        as: 'attachments',
        attributes: ['filePath', 'order'],
        limit: 2,
        order: [['order', 'ASC']],
      },
      {
        model: GroupLicense,
        as: 'groupLicense',
        attributes: ['licenseName'],
      },
      {
        model: Department,
        as: 'department',
        attributes: ['name'],
      },
    ],
    order: [['updatedAt', 'DESC']],
  });

  return licenses || [];
};

const countLicenses = async (filters) => {
  try {
    return await License.count({
      where: filters,
    });
  } catch (error) {
    console.error('Error counting licenses:', error);
    throw new Error('An error occurred while counting licenses');
  }
};

const getLicenseById = async (id) => {
  try {
    const license = await License.findByPk(id);
    if (!license) {
      return null;
    }

    const formattedLicense = {
      ...license.toJSON(),
      warrantIssueDate: moment(license.warrantIssueDate).format('YYYY-MM-DD'),
      warrantExpiredDate: moment(license.warrantExpiredDate).format('YYYY-MM-DD'),
    };
    return { data: formattedLicense };
  } catch (error) {
    return { error: true, message: error.message };
  }
};

const searchLicenses = async (term) => {
  const { ownerName } = term

  try {
    const licenses = await License.findAll({
      where: {
        ownerName: ownerName
      }
    });

    if (licenses.length === 0) {
      return { error: true, message: 'No licenses found' };
    }

    return { data: licenses };
  } catch (error) {
    return { error: true, message: error.message };
  }
};

const createLicense = async (licenseData) => {
  try {
    const newLicense = await License.create(licenseData);
    return { data: newLicense };
  } catch (error) {
    return { error: true, message: error.message };
  }
};

const updateLicense = async (id, updateData) => {
  try {
    const license = await License.update(updateData, { where: { id } });
    return license ? { data: license } : null;
  } catch (error) {
    return { error: true, message: error.message };
  }
};

const importLicenses = async (licenses) => {
  try {
    const importedLicenses = await License.bulkCreate(licenses);
    return { data: importedLicenses };
  } catch (error) {
    return { error: true, message: error.message };
  }
};

const getGroupLicense = async () => {
  try {
    const group = await GroupLicense.findAll({ attributes: ['id', 'licenseName'] });
    return { data: group };
  } catch (error) {
    return { error: true, message: error.message };
  }
}

const getDepartment = async () => {
  try {
    const department = await Department.findAll({
      attributes: ['id', 'name']
    });
    return { data: department };
  } catch (error) {
    return { error: true, message: error.message };
  }
}

const uploadFiles = async (licenseId, files) => {

};

const removeLicenseAndFiles = async (licenseId) => {
  try {
    const license = await License.findByPk(licenseId);

    if (!license) {
      throw new Error('License not found');
    }

    await Attachment.destroy({ where: { licenseId } });
    await License.destroy({ where: { id: licenseId } });

    return true;
  } catch (error) {
    console.error('Error deleting license and files:', error);
    throw error;
  }
};

module.exports = {
  getAllLicenses,
  getLicenseById,
  searchLicenses,
  createLicense,
  updateLicense,
  importLicenses,
  uploadFiles,
  countLicenses,
  getGroupLicense,
  getDepartment,
  removeLicenseAndFiles
};
