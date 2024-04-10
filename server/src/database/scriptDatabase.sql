create database pinup;

use pinup;

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    apellido VARCHAR(255) NOT NULL,
    ciudad VARCHAR(255),
    telefono VARCHAR(20),
    email VARCHAR(255),
    fecha_nacimiento DATE,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    actualizado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO
    `pinup`.`usuarios` (
        `nombre`,
        `apellido`,
        `ciudad`,
        `telefono`,
        `email`,
        `fecha_nacimiento`,
        `contrasena`,
        `fecha_creacion`
    )
VALUES
    (
        'Sergio',
        'Jauregui',
        'Bogota',
        '3203795827',
        'sergioja2003@gmail.com',
        '2003-10-21',
        'admin',
        '2024-04-09 13:17:28'
    );