const express = require('express');
require('dotenv').config();
const { dbConection } = require('./database/config');
const cors = require('cors');


//CREAR SERVIDOR
const app = express();

//Base de datos
dbConection();

//CORS
app.use(cors());

//Directorio publico

app.use( express.static('public') );

//Lectura y parseo del body

app.use( express.json() );

//RUTAS
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

//Escuchar peticiones
app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${ process.env.PORT }`);
});