const { Router } = require('express');
const router = Router();

const { getPais, getCiudad, createCiudad} = require('../controllers/index.controllers')
router.get('/get', getCiudad);
router.post('/create', createCiudad);



module.exports = router;