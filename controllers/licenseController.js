const { validationResult } = require('express-validator');
const LicenseService = require('../services/licenseService');
const AttachmentService = require('../services/AttachmentService')
const { Op } = require('sequelize');

const handleResponse = (res, result, successCode = 200, failureCode = 500) => {
  if (result.error) {
    return res.status(failureCode).json({ error: result.message });
  }
  return res.status(successCode).json(result.data);
};

const listLicenses = async (req, res) => {
  try {
    const { page = 1, limit = 10, regPrefix, licenseNumber, provinceId, groupLicenseId, departmentId, status } = req.query;
    const offset = (page - 1) * limit;

    const filters = buildFilters({
      regPrefix,
      licenseNumber,
      provinceId,
      groupLicenseId,
      departmentId,
      status,
    });

    const [licenses, totalLicenses] = await Promise.all([
      LicenseService.getAllLicenses(filters, offset, limit),
      LicenseService.countLicenses(filters),
    ]);

    return res.status(200).json({
      data: licenses,
      meta: {
        total: totalLicenses,
        page: parseInt(page, 10),
        totalPages: Math.ceil(totalLicenses / limit),
        limit: parseInt(limit, 10),
      },
    });
  } catch (error) {
    console.error('Error fetching licenses:', error);
    return res.status(500).json({ error: 'An error occurred while fetching licenses' });
  }
};

const buildFilters = ({ regPrefix, licenseNumber, provinceId, groupLicenseId, departmentId, status }) => {
  const filters = {};

  if (regPrefix) {
    filters.regPrefix = { [Op.like]: `%${regPrefix}%` };
  }

  if (licenseNumber) {
    filters.licenseNumber = { [Op.like]: `%${licenseNumber}%` };
  }

  if (provinceId) {
    filters.provinceId = provinceId;
  }

  if (groupLicenseId) {
    filters.groupLicenseId = groupLicenseId;
  }

  if (departmentId) {
    filters.departmentId = departmentId;
  }

  if (status === 'Active') {
    filters.isActive = true;
  } else if (status === 'Inactive') {
    filters.isActive = false;
  }

  return filters;
};


const getLicenseDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const license = await LicenseService.getLicenseById(id);
    if (!license) {
      return res.status(404).json({ error: 'License not found' });
    }
    return handleResponse(res, { data: license });
  } catch (error) {
    return handleResponse(res, { error: true, message: error.message }, 500);
  }
};

const getGroupLicense = async (req, res) => {
  try {
    const result = await LicenseService.getGroupLicense();
    return handleResponse(res, { data: result });
  } catch (error) {
    return handleResponse(res, { error: true, message: error.message }, 500);
  }
}

const getDepartment = async (req, res) => {
  try {
    const result = await LicenseService.getDepartment();
    return handleResponse(res, { data: result });
  } catch (error) {
    return handleResponse(res, { error: true, message: error.message }, 500);
  }
}


const searchLicenses = async (req, res) => {
  try {
    const { term } = req.query;

    if (!term) {
      return handleResponse(res, { error: true, message: 'Search term is required' }, 400);
    }

    const result = await LicenseService.searchLicenses(term);

    if (result.error) {
      return handleResponse(res, { error: true, message: result.message }, 404);
    }

    return handleResponse(res, result);
  } catch (error) {
    return handleResponse(res, { error: true, message: error.message }, 500);
  }
};

const createLicense = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const newLicense = await LicenseService.createLicense(req.body);
    const uploadedFiles = req.body.uploadedFiles;
    await AttachmentService.createAttachments(newLicense.data.id, uploadedFiles);

    return handleResponse(res, { data: newLicense }, 200);
  } catch (error) {
    console.error('Error creating license and saving attachments:', error);
    return handleResponse(res, { error: true, message: error.message }, 500);
  }
};

const editLicense = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { id } = req.params;
    const { uploadedFiles } = req.body;

    const updatedLicense = await LicenseService.updateLicense(id, req.body);
    if (!updatedLicense) {
      return res.status(404).json({ error: 'License not found' });
    }

    await AttachmentService.updateAttachments(id, uploadedFiles);

    return handleResponse(res, { data: updatedLicense });
  } catch (error) {
    return handleResponse(res, { error: true, message: error.message }, 500);
  }
}

const importLicenses = async (req, res) => {
  try {
    const licenses = req.body;
    const result = await LicenseService.importLicenses(licenses);
    return handleResponse(res, { data: result }, 200);
  } catch (error) {
    return handleResponse(res, { error: true, message: error.message }, 500);
  }
};

const uploadLicenseFiles = async (req, res) => {
  try {
    const { id } = req.params;
    const files = req.files;  // Assume file upload middleware is used
    const result = await LicenseService.uploadFiles(id, files);
    return handleResponse(res, { data: result });
  } catch (error) {
    return handleResponse(res, { error: true, message: error.message }, 500);
  }
};

const removeLicenseFiles = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await LicenseService.removeLicenseAndFiles(id);

    if (result) {
      return res.status(200).json({ message: 'License and associated files removed successfully.' });
    } else {
      return res.status(404).json({ message: 'License not found.' });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  listLicenses,
  getLicenseDetail,
  searchLicenses,
  createLicense,
  editLicense,
  importLicenses,
  uploadLicenseFiles,
  removeLicenseFiles,
  getGroupLicense,
  getDepartment
};
