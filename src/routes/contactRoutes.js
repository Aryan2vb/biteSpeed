const express = require('express');
const { identifyContactController , getData } = require('../controllers/contactController');
const router = express.Router();

router.post('/identify', identifyContactController);
router.get('/identify', getData);

module.exports = router;