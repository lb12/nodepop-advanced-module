'use strict';

const express = require('express');
const router = express.Router();

const authFacade = require('../../controllers/api/facades/authFacade');

router.post('/', authFacade.authenticate);

module.exports = router;