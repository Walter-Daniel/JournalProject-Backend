const express = require('express');
require('dotenv').config()


//CREAR SERVIDOR
const app = express();

//RUTAS

//Directorio publico

app.use( express.static('public') );


// app.get('/', (req, res) => {
//     res.json({
//         ok: true
//     })
// })


//Escuchar peticiones
app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${ process.env.PORT }`);
});