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
    const response = await pool.query('SELECT c.id, c.nombre, p.nombre as pais from ciudad c join pais p on c.id_pais=p.id');
    res.status(200).json(response.rows);
};


const getCiudadById = async (req,res) => {
    const id = req.params.id;
    const response = await pool.query('SELECT c.id, c.nombre, p.nombre as pais from ciudad c join pais p on c.id_pais=p.id WHERE c.id = $1', [id]);    
    res.json(response.rows);
}

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

const deleteCiudad = async (req, res) => {
    const id = req.params.id;
    const response = await pool.query('DELETE FROM ciudad WHERE id = $1', [id])
    res.json('Ciudad eliminada')
}

const updateCiudad = async (req, res) => {
    const id = req.params.id;
    const { nombre } = req.body;
    const response = await pool.query('UPDATE ciudad SET nombre = $1 WHERE id = $2', [nombre,id])
    res.json('Ciudad actualizada')
    console.log(id,nombre)
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