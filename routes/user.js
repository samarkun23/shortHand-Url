const express = require('express');
const { handleUserSingup } = require('../controllers/user');
const router = express.Router();

router.post('/', handleUserSingup)




















module.exports = router;





















