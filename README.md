Pasos:

*en caso de problemas CORS, desde terminal: npm install cors

1 - instalar node modules npm install

2 - tener instalado node npm install node

3 - consultar version node node --v

4 - levantar servidor node index.js (dejar escuchando en el puerto)

5 - descargar postman desktop https://www.postman.com/

6 - en postman acceder al endpoint configurado http://localhost:3000/api/login

7 - opciones Postman método POST, en body opción raw y formato JSON

8 - escribir en Body { "email" : "Sincere@april.biz", "password" : "secret" }

estos datos de usuarios los obtenemos de la carpeta db, archivo user.json la contraseña es: secret

obtenemos un JWT

9 - revisar información JWT https://jwt.io/

10 - Una vez obtenido el JWT ingresar email y password en el servidor local htttp://localhost:3000/jwt-practico
email : "Sincere@april.biz", 
password : "secret"

11 - aparecerán 2 tablas la primera con titulos y cuerpos de POST y la segunda con id y titulo de ALBUMS

