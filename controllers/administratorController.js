const { validationResult } = require('express-validator');
const AdministratorService = require('../services/AdministratorService');

const handleResponse = (res, result, successCode = 200, failureCode = 500) => {
  if (result.error) {
    return res.status(failureCode).json({ error: result.message });
  }
  return res.status(successCode).json(result.data);
};

const getProvince = async (req, res) => {
    try {
        const result = await AdministratorService.getProvince();
        return handleResponse(res, { data: result});
    } catch (error) {
        return handleResponse(res, { error: true, message: error.message }, 500);
    }
}

module.exports = {
  getProvince
};
