const { Router } = require('express');
const router = Router();

const { getPais, getCiudad, createCiudad,getCiudadById,deleteCiudad,updateCiudad} = require('../controllers/index.controllers')
router.get('/api/get', getCiudad);
router.get('/api/get/:id', getCiudadById);
router.post('/api/create', createCiudad);
router.delete('/api/get/:id', deleteCiudad);
router.put('/api/get/:id', updateCiudad);


module.exports = router;