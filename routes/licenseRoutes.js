const express = require('express');
const {
  listLicenses,
  getLicenseDetail,
  getGroupLicense,
  searchLicenses,
  createLicense,
  editLicense,
  importLicenses,
  uploadLicenseFiles,
  removeLicenseFiles,
  getDepartment
} = require('../controllers/licenseController');

const router = express.Router();

router.get('/', listLicenses);
router.get('/groupLicense', getGroupLicense);
router.get('/department', getDepartment);
router.get('/:id', getLicenseDetail);
router.get('/search', searchLicenses);
router.post('/', createLicense);
router.put('/:id', editLicense);
router.post('/import', importLicenses);
router.post('/:id/files', uploadLicenseFiles);
router.delete('/:id', removeLicenseFiles);

module.exports = router;
