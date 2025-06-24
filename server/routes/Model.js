const express = require('express');
const router = express.Router();
const {getResponse } = require('../controllers/modelController');
const {isLoggedIn} = require('../middlewares/Auth');
router.post('/analyse',getResponse)
module.exports = router;