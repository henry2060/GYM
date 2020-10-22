# API-GYM
aplicacion que implementa CRUD para usuarios de gimnasiosm distribuidos en diferentes sedes

# Prerequisitos

Validar que se cuenta con node y npm:
```
node -v
npm version
```

# Despliegue

clonar el repositorio por comando o descargarlo. Desde la consola ubicarse en la raiz del proyecto y ejecutar los siguiente Scripts

```
npm install
npm run build
npm run dev
```
una vez ejecutados los scripts estara habilitado el servidor nodeJs por el puerto 5000 y podra realizar las peticiones desde la herramienta que prefiera para el consumo de servicios (Postman, insomnia, etc). las funciones utilizadas se consumen mediante POST, GET, DELETE.

```
http://localhost:3000/gym/users
```
# DB
Se agregan los scripts utilizados para generar la DB, tablas y procedimiento almacenado utilizado en el API, esta es necesaria para los consumos de lo servicios

# Unit Test

se genero un paquete de pruebas el cual se puede ejecutar con el siguiente script:
```
npm run test
npm run average
```
# Docker
La aplicacion se encuentra dockerizada por lo tanto se puede ejecutar desde su contenedor, recordar generar el build del proyecto antes generar la imagen docker

para crea la imagen:
```
docker build -t gymapp .
```
para ejecutar la imagen
```
docker run -it --rm -p 8888:5000 gymapp
```
