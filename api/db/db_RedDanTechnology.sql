-- Active: 1688557221070@@localhost@3306@db_prueba_tecnica


/* Creación de la base de dato luego se usa */
CREATE DATABASE db_prueba_tecnica;
USE db_prueba_tecnica;

CREATE TABLE cliente (
    id_cliente INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    apellido VARCHAR(255) NOT NULL,
    direccion VARCHAR(255) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    telefono INT NOT NULL,
    email VARCHAR(255) NOT NULL,
    categoria VARCHAR(255) NOT NULL
);

CREATE TABLE factura(
num_factura INT NOT NULL AUTO_INCREMENT PRIMARY KEY ,
id_cliente INT NOT NULL,
fecha DATE NOT NULL,
id_producto INT,
FOREIGN KEY (id_cliente) REFERENCES cliente(id_cliente)
);

CREATE TABLE producto (
id_producto INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
nombre VARCHAR(255) NOT NULL,
precio INT NOT NULL,
stock INT NOT NULL,
id_factura INT ,
FOREIGN KEY (id_factura) REFERENCES factura(num_factura)
);

ALTER TABLE factura
ADD FOREIGN KEY (id_producto) REFERENCES producto(id_producto);


INSERT INTO cliente (nombre, apellido, direccion, fecha_nacimiento, telefono, email, categoria)
VALUES ('Juan', 'Perez', 'Calle 123', '1990-01-01', 123456789, 'juan@example.com', 'Categoria A');

INSERT INTO cliente (nombre, apellido, direccion, fecha_nacimiento, telefono, email, categoria)
VALUES ('Maria', 'Gomez', 'Avenida 456', '1985-05-15', 987654321, 'maria@example.com', 'Categoria B');

INSERT INTO cliente (nombre, apellido, direccion, fecha_nacimiento, telefono, email, categoria)
VALUES ('Carlos', 'Rodriguez', 'Plaza Principal 789', '1982-09-20', 555123789, 'carlos@example.com', 'Categoria C');

INSERT INTO cliente (nombre, apellido, direccion, fecha_nacimiento, telefono, email, categoria)
VALUES ('Laura', 'Ramirez', 'Calle 567', '1995-03-10', 999888777, 'laura@example.com', 'Categoria A');

INSERT INTO cliente (nombre, apellido, direccion, fecha_nacimiento, telefono, email, categoria)
VALUES ('Pedro', 'Sanchez', 'Av. Libertad 234', '1988-07-12', 111222333, 'pedro@example.com', 'Categoria B');

INSERT INTO cliente (nombre, apellido, direccion, fecha_nacimiento, telefono, email, categoria)
VALUES ('Ana', 'Martinez', 'Calle 890', '1993-11-25', 777666555, 'ana@example.com', 'Categoria C');

INSERT INTO cliente (nombre, apellido, direccion, fecha_nacimiento, telefono, email, categoria)
VALUES ('Luis', 'Torres', 'Paseo 456', '1980-04-05', 333444555, 'luis@example.com', 'Categoria A');

INSERT INTO cliente (nombre, apellido, direccion, fecha_nacimiento, telefono, email, categoria)
VALUES ('Marta', 'Fernandez', 'Calle 789', '1987-08-18', 555444333, 'marta@example.com', 'Categoria B');

INSERT INTO cliente (nombre, apellido, direccion, fecha_nacimiento, telefono, email, categoria)
VALUES ('Javier', 'Gomez', 'Avenida 678', '1992-02-28', 777888999, 'javier@example.com', 'Categoria A');

INSERT INTO cliente (nombre, apellido, direccion, fecha_nacimiento, telefono, email, categoria)
VALUES ('Isabel', 'Ruiz', 'Plaza 345', '1984-06-15', 999000111, 'isabel@example.com', 'Categoria C');

INSERT INTO cliente (nombre, apellido, direccion, fecha_nacimiento, telefono, email, categoria)
VALUES ('Jorge', 'Rodriguez', 'Callejon 12', '1994-12-10', 111222333, 'jorge@example.com', 'Categoria A');

INSERT INTO cliente (nombre, apellido, direccion, fecha_nacimiento, telefono, email, categoria)
VALUES ('Paola', 'Jimenez', 'Avenida 901', '1989-03-25', 444555666, 'paola@example.com', 'Categoria B');







INSERT INTO producto (nombre, precio, stock)
VALUES ('Producto A', 50, 100);

INSERT INTO producto (nombre, precio, stock)
VALUES ('Producto B', 75, 50);




INSERT INTO factura (id_cliente, fecha,id_producto)
VALUES (1, '2024-01-18',1);

INSERT INTO factura (id_cliente, fecha,id_producto)
VALUES (2, '2024-01-19',2);











 
/* DESCRIBE factura; */
