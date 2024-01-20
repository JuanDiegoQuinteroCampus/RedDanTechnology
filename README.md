# Red Dan Technology



## Instalación de Dependencias y Operación 

Siga estos pasos para instalar y ejecutar el proyecto:

1. Clone este repositorio en su máquina local (Consola windows, Linux, Mac) `git clone https://github.com/JuanDiegoQuinteroCampus/RedDanTechnology.git`
2. Desde esa misma terminal y navegue hasta la carpeta del proyecto. `cd RedDanTechnology` y abre VsCode `code .`

#### Configuración ⚙️

Antes de continuar, asegúrese de haber configurado su proyecto correctamente.

### 🔴 Archivo "`.env`"

Configure el archivo `.env` en la raíz del proyecto y llénelo con su información necesaria:

```
Por defecto:
MY_CONFIG={"hostname": "localhost", "port":5023}
MY_CONNECT={"host": "localhost","user": "root","database": "db_prueba_tecnica",  "port":3306}
        
Ejemplo:
MY_CONFIG={"hostname": "localhost", "port":5023}
MY_CONNECT={"host": "localhost","user": "","database": "db_prueba_tecnica", 'password':'', "port":3306}
        Ojo si no necesitas el campo password quitarlo!!
```



### 🔴 Dependencias de desarrollo

Asegúrese de tener lo siguiente instalado antes de iniciar el proyecto:

```
 "dependencies": {
    "cors": "^2.8.5",
    "pdfkit": "^0.14.0",
    "pinia": "^2.1.7",
    "vue": "^3.3.11",
    "vue-router": "^4.2.5"
  },
  "devDependencies": {
    "@tsconfig/node18": "^18.2.2",
    "@types/jsdom": "^21.1.6",
    "@types/node": "^18.19.3",
    "@vitejs/plugin-vue": "^4.5.2",
    "@vitejs/plugin-vue-jsx": "^3.1.0",
    "@vue/test-utils": "^2.4.3",
    "@vue/tsconfig": "^0.5.0",
    "class-transformer": "0.5.1",
    "class-validator": "0.14.0",
    "cookie-parser": "1.4.6",
    "dotenv": "16.3.1",
    "express": "4.18.2",
    "jose": "4.14.4",
    "jsdom": "^23.0.1",
    "mysql2": "3.5.2",
    "nanoid": "4.0.2",
    "nodemon": "3.0.1",
    "npm-run-all2": "^6.1.1",
    "typescript": "~5.3.0",
    "vite": "^5.0.10",
    "vitest": "^1.0.4",
    "vue-tsc": "^1.8.25"
  }
```



Para esto, puede usar el comando `npm i` desde la terminal de VsCode

1. Inicie el servidor usando el comando para iniciar el backend `npm run start`.
2. En otra terminal, sin cerrar la anterior corra el siguiente comando `npm run dev` para iniciar el frontend
3. Para que la base de datos con mysql funcione, puede utilizar la extension `Mysql VS Code`.
4. Abre la extension y agrega una nueva conexión ( + )



Luego de esto dirigete a la carpeta api, luego a la carpeta db asi encontrando al archivo db_RedDanTechnology.sql, para de este modo seleccionar todo lo de este archivo para crear la base de datos y dar uso de ella, ademas de crear las tablas con sus datos







# Backend queries



#### Clientes CRUD

GET

`http://localhost:5023/clientes/all?direccion=Avenida 456`  busca por medio del campo direccion, si cambias el campo direccion a nombre  como:`http://localhost:5023/clientes/all?nombre=juan` va  abuscar el dato

`http://localhost:5023/clientes/all` Muestra todos los datos



POST

```{
    http://localhost:5023/clientes/post
  {
    "nombre": "Prueba",
    "apellido": "tecno",
    "direccion": "Calle 123",
    "fecha_nacimiento": "2006-03-03",
    "telefono": 123456789,
    "email": "asda@example.com",
    "categoria": "Categoria A"
  }
```

UPDATE

    http://localhost:5023/clientes/put/3

``````
{
    "nombre": "Juan",
    "apellido": "cambio",
    "direccion": "Calle 123",
    "fecha_nacimiento": "2006-03-03",
    "telefono": 123456789,
    "email": "asda@example.com",
    "categoria": "Categoria A"
  }
``````

DELETE

``````
http://localhost:5023/clientes/delete/3
``````







#### Producto CRUD

GET

`http://localhost:5023/producto/all` Muestra todos los datos



POST

```{
    http://localhost:5023/producto/post
  {
    
    "nombre": "Producto C",
    "precio": 50,
    "stock": 100,
    "id_factura": 1
  }
```

UPDATE

    http://localhost:5023/producto/put/3

``````
 {
 
    "nombre": "Producto C",
    "precio": 10000,
    "stock": 100,
    "id_factura": 1
  }
``````

DELETE

``````
http://localhost:5023/producto/delete/3
``````







#### Factura CRUD

GET

`http://localhost:5023/factura/all` Muestra todos los datos



POST

```{
    http://localhost:5023/factura/post
 {
    
    "id_cliente": 4,
    "fecha": "2022-01-18",
    "id_producto": 2
  }
```

UPDATE

    http://localhost:5023/factura/put/3

``````
  {
    
    "id_cliente": 7,
    "fecha": "2022-01-18",
    "id_producto": 1
  }
``````

DELETE

``````
http://localhost:5023/factura/delete/3
``````







