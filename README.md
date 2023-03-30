# JournalProject-Backend

Utilicé Nodejs para crear RESTserver, subir y administrar archivos en el servidor. Para guardar imagenes utilice cloudinary y lo conecté con la api. Trabaje con middlewares tanto propios como externos (como por ejemplo el middleware "check" que ofrece express-validator) en el ruteo.
La información para conectar la Base de Datos con la api, se encuntra guardada en el archivo .env y estan configurados dentro del archivo config.Las contraselas se encuentran hasheadas por medio de bcrypt.
Al iniciar la aplicación se genera un token, cuya duración es de 4hs. Para trabajar con tranquilidad se recomienda aumentar el tiempo de de duración.
