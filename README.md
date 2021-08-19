Pasos:

*en caso de problemas CORS, desde terminal: npm install cors

1 - instalar node modules npm install

2 - tener instalado node npm install node

3 - consultar version node node --v

4 - levantar servidor node index.js

5 - acceder al servidor local htttp://localhost:3000

6 - descargar postman desktop https://www.postman.com/

7 - en postman acceder al endpoint configurado http://localhost:3000/api/login

8 - opciones Postman método POST, en body opción raw y formato JSON

9 - escribir en Body { "email" : "Sincere@april.biz", "password" : "secret" }

estos datos de usuarios los obtenemos de la carpeta db, archivo user.json la contraseña es: secret

obtenemos un JWT

10 - revisar información JWT https://jwt.io/
