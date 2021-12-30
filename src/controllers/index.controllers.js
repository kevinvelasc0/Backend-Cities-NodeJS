const {Pool} = require('pg');

const pool = new Pool ({
    host: 'localhost',
    user: 'postgres',
    password: 'postgres',
    database: 'europa',
    port: '5432'
});

const getPais = async (req, res) => {
    const response = await pool.query('SELECT * FROM pais');
    res.status(200).json(response.rows);
};
const getCiudad = async (req, res) => {
    const response = await pool.query('SELECT c.nombre, p.nombre as pais from ciudad c join pais p on c.id_pais=p.id');
    res.status(200).json(response.rows);
};
const createCiudad = async (req, res) => {
    const { nombre, id_pais } = req.body;
    const response = await pool.query('INSERT INTO ciudad (nombre,id_pais) VALUES ($1, $2)', [nombre,id_pais])
    res.json({
        message: 'Ciudad agregada satisfactoriamente',
        body:{
            ciudad : {nombre}
        } 
    })
}


const createPais = async (req ,res) => {

};

module.exports = {
    getPais,
    getCiudad,
    createCiudad
}