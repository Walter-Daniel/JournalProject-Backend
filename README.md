## Características principales

- **Node.js**: Se utilizó Node.js como entorno de ejecución para el servidor backend.
- **REST API**: Se implementó una API REST para interactuar con el servidor desde el frontend u otras aplicaciones.
- **Subida y gestión de archivos**: Se implementó la funcionalidad para subir y administrar archivos en el servidor.
- **Cloudinary**: Se utilizó Cloudinary para almacenar y gestionar imágenes en la nube, conectándolo con la API.
- **Middlewares**: Se emplearon middlewares tanto propios como externos, como el middleware "check" ofrecido por express-validator, para el enrutamiento.
- **Seguridad**: Las contraseñas se almacenan en forma hasheada mediante bcrypt para garantizar la seguridad de los usuarios.
- **Token de autenticación**: Al iniciar la aplicación se genera un token de autenticación, con una duración predeterminada de 4 horas. Se recomienda ajustar este tiempo según las necesidades de seguridad del proyecto.
- **Inicio de sesión**: Se implementó un sistema de inicio de sesión para los usuarios, lo que permite acceder a funcionalidades protegidas de la aplicación.
- **Administración de notas**: Se desarrolló un sistema para que los usuarios puedan crear, leer, actualizar y eliminar notas, permitiendo una gestión completa de las mismas.

## Configuración

- **Variables de entorno**: La información necesaria para conectar la base de datos con la API se encuentra guardada en el archivo `.env`, el cual contiene las configuraciones de la base de datos y otras variables sensibles.
- **Configuración**: Las variables de entorno se cargan y se configuran en el archivo `config.js`.

## Recomendaciones

Para trabajar con mayor tranquilidad y seguridad, se recomienda realizar las siguientes acciones:

- Aumentar la duración del token de autenticación según las necesidades del proyecto.
- Mantener actualizadas las bibliotecas y dependencias utilizadas en el proyecto para mitigar posibles vulnerabilidades de seguridad.

¡Gracias por revisar este repositorio! Si tienes alguna pregunta o sugerencia, no dudes en ponerte en contacto.
