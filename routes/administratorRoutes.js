const express = require('express');
const {
  getProvince
} = require('../controllers/administratorController');

const router = express.Router();
router.get('/province', getProvince);     

module.exports = router;
