// Servicios de express para levantar el servidor
const express = require('express');
const app = express();

//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Servidor listo
app.listen(3000);
console.log('Servidor en el puerto 3000');

//Enrutamiento
app.use(require('./routes/index'));
