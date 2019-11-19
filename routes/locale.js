'use strict';

const express = require('express');
const router = express.Router();

const localeController = require('../controllers/front/locale');

router.get('/:locale', localeController.setLocale);

module.exports = router;