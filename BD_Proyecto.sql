CREATE DATABASE IF NOT EXISTS db_api_proyecto;
USE db_api_proyecto;

CREATE TABLE IF NOT EXISTS Usuario(
    id_usuario INT(10) NOT NULL AUTO_INCREMENT,
    nombre_usuario VARCHAR(255) NOT NULL,
    contrasenia VARCHAR(255) NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    apellido VARCHAR(255) NOT NULL,
    telefono INT(15) NOT NULL,
    email VARCHAR(255) NOT NULL,
    PRIMARY KEY(id_usuario)
);

INSERT INTO Usuario VALUES(
    1,'pepe10','123456','Jose' ,'Lopez',154211223,'pepe@gmail.com'),
    (2,'diego30','012345','Diego', 'Leal',155435321,'eldiego@gmail.com');

CREATE TABLE IF NOT EXISTS Cliente(
    id_cliente INT(10) NOT NULL AUTO_INCREMENT,
    id_usuario INT(10) ,
    nombre VARCHAR(255) NOT NULL,
    apellido VARCHAR(255) NOT NULL,
    dni INT(8) NOT NULL,
    email VARCHAR(255) NOT NULL,
    activo BOOLEAN NOT NULL,
    PRIMARY KEY (id_cliente),
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
);

INSERT INTO Cliente VALUES(
    1,1,'Dario','Carrizo',25567876,'dariorizo@gmail.com',TRUE),
    (2,1,'Dalma','Mamani',36674897,'dalmam@gmail.com',TRUE),
    (3,1,'Walter','Bueno',29743333,'buenowaly@gmail.com',TRUE),
    (4,2,'Mario','Guanca',23987102,'marito99@gmail.com',TRUE),
    (5,2,'Sebastian','Condori',26709332,'seba@gmail.com',TRUE),
    (6,2,'Stefania','Ghilardi',35789209,'stefy@gmail.com',TRUE);

CREATE TABLE IF NOT EXISTS Productos(
    id_producto INT(10) NOT NULL AUTO_INCREMENT,
    id_usuario INT(10) ,
    nombre_producto VARCHAR(255) NOT NULL,
    marca VARCHAR(255) NOT NULL,
    precio INT(8) NOT NULL,
    categoria VARCHAR(255) NOT NULL,
    descripcion VARCHAR(255) NOT NULL,
    stock INT(8),
    PRIMARY KEY (id_producto),
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
);

INSERT INTO Productos VALUES(
    1,1,'Notebook Z10', 'HP' , 230000, 'Computacion', 'Intel I5 12Gen 12Ram 512gb SSD', 10),
    (2,1,'Televisor 32"', 'Samsung', 120000,'Electrodomestico','Smart tv con Netlix y Disney+',20),
    (3,2,'Lavaropas 10kg', 'Drean', 230000,'Electrodomesticos','10 funciones de lavado con secado rapido',12),
    (4,2,'Heladera 210 kg', 'Patrick', 403000,'Electrodomesticos','Heladera con Frezzer capacidad 210 kg ',3);

CREATE TABLE IF NOT EXISTS Facturas(
    id_factura INT(10) NOT NULL AUTO_INCREMENT,
    id_cliente INT(10),
    id_usuario INT(10),
    hora_fecha DATETIME,
    cant_productos INT(10),
    descuento INT(5),
    TOTAL INT(10),
    PRIMARY KEY(id_factura),
    FOREIGN KEY (id_cliente) REFERENCES cliente(id_cliente),
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario)
);

CREATE TABLE IF NOT EXISTS Ventas_Productos(
    id_ventas_productos INT(10) NOT NULL AUTO_INCREMENT,
    id_factura INT(10),
    id_producto INT(10),
    cantidad INT(8),
    precio INT(8),
    subtotal INT(10),
    PRIMARY KEY(id_ventas_productos),
    FOREIGN KEY(id_producto) REFERENCES productos(id_producto)
);
INSERT INTO Ventas_Productos VALUES(
    1,1,1,2,230000,460000),
    (2,1,2,1,120000,120000);

INSERT INTO Facturas VALUES(
    1,1,1,'2023-11-30 03:13:34',3,5000,455000);

CREATE TABLE IF NOT EXISTS Servicios(
    id_servicio INT(10) NOT NULL AUTO_INCREMENT,
    id_usuario INT(10) ,
    nombre_servicio VARCHAR(255) NOT NULL,
    precio INT(8) NOT NULL,
    descripcion VARCHAR(255),
    PRIMARY KEY (id_servicio),
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario)
);
INSERT INTO Servicios VALUES(
    1,2,'Envio gratis', 0 , 'Envio gratis con compras mayores a 5000'),
    (2,1,'Envio a ciudades cercanas', 2000 , 'Envio a 10 km del local');

CREATE TABLE IF NOT EXISTS Ventas_Servicios(
    id_ventas_servicios INT(10) NOT NULL AUTO_INCREMENT,
    id_factura INT(10),
    id_servicio INT(10),
    cantidad INT(10)NOT NULL,
    precio INT(8),
    subtotal INT(10),
    PRIMARY KEY(id_ventas_servicios),
    FOREIGN KEY(id_servicio) REFERENCES Servicios(id_servicio)
);
