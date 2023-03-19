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

//FileUpload - cargar archivos
// app.use(fileUpload({
//     useTempFiles : true,
//     tempFileDir : '/tmp/'
// }));

//RUTAS
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));
app.use('/api/uploads', require('./routes/uploads'));

//Escuchar peticiones
app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${ process.env.PORT }`);
});