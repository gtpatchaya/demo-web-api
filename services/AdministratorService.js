const Provice = require('../models/provinceModel');

const getProvince = async () => {
    try {
        const res = await Provice.findAll({ attributes: ['id','name']});
        return { data: res }
    } catch (error) {
         return { error: true, message: error.message };
    }
}

module.exports = { 
    getProvince
}