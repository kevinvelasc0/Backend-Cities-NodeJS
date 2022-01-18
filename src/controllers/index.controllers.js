const {Pool} = require('pg');

const pool = new Pool ({
    host: 'localhost',
    user: 'postgres',
    password: 'postgres',
    database: 'europa',
    port: '5432'
});

const getPais = async (req, res) => {
    const response = await pool.query('SELECT id,nombre FROM pais');
    res.status(200).json(response.rows);
};
const getCiudad = async (req, res) => {
    const response = await pool.query('SELECT c.id, c.nombre,c.poblacion, p.nombre as pais from ciudad c join pais p on c.id_pais=p.id');
    res.status(200).json(response.rows);
};


const getCiudadById = async (req,res) => {
    const id = req.params.id;
    const response = await pool.query('SELECT c.id, c.nombre,c.poblacion, p.nombre as pais,p.id as id_pais from ciudad c join pais p on c.id_pais=p.id WHERE c.id = $1', [id]);    
    res.json(response.rows);
}

const createCiudad = async (req, res) => {
    const { nombre, id_pais,poblacion } = req.body;
    const response = await pool.query('INSERT INTO ciudad (nombre,id_pais,poblacion) VALUES ($1, $2,$3)', [nombre,id_pais,poblacion])
    res.json({
        message: 'Ciudad agregada satisfactoriamente',
        body:{
            ciudad : {nombre}
        } 
    })
}

const deleteCiudad = async (req, res) => {
    const id = req.params.id;
    const response = await pool.query('DELETE FROM ciudad WHERE id = $1', [id])
    res.json('Ciudad eliminada')
}

const updateCiudad = async (req, res) => {
    const id = req.params.id;
    const { nombre,poblacion,id_pais } = req.body;
    const response = await pool.query('UPDATE ciudad SET nombre = $1, id_pais = $2, poblacion = $3 WHERE id = $4', [nombre,id_pais,poblacion,id])
    res.json('Ciudad actualizada')
}


const createPais = async (req ,res) => {

};

module.exports = {
    getPais,
    getCiudad,
    createCiudad,
    getCiudadById,
    deleteCiudad,
    updateCiudad
}