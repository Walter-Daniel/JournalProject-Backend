const express = require('express');
require('dotenv').config();
const { dbConection } = require('./database/config')


//CREAR SERVIDOR
const app = express();

//Base de datos
dbConection();

//Directorio publico

app.use( express.static('public') );

//Lectura y parseo del body

app.use( express.json() );

//RUTAS
app.use('/api/auth', require('./routes/auth'))



//Escuchar peticiones
app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${ process.env.PORT }`);
});