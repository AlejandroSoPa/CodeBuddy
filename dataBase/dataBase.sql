CREATE TABLE Usuario (
    id INT PRIMARY KEY,
    nombre VARCHAR(255) UNIQUE,
    correo VARCHAR(255) UNIQUE,
    contrasena VARCHAR(255),
    idIdioma INT, -- He creado la tabla Idiomas para que el usuario pueda tener varios idiomas
    rutaFotoPerfil VARCHAR(255),
    descripcion VARCHAR(1000),
    idNivel INT,
    perfilGitHub VARCHAR(255),
    perfilLinkedIn VARCHAR(255),
    perfilTwitter VARCHAR(255),
);

CREATE TABLE Idiomas (
    id INT PRIMARY KEY,
    nombre VARCHAR(255),
    FOREIGN KEY (id) REFERENCES Usuario(idIdioma)
);

CREATE TABLE Nivel (
    id INT PRIMARY KEY,
    nombre ENUM("estudiante", "profesional", "hobbie"),
    FOREIGN KEY (id) REFERENCES Usuario(idNivel)
);

CREATE TABLE PostForo (
    id INT PRIMARY KEY,
    texto TEXT,
    idUsuario INT,
    fechaCreacion DATE,
    FOREIGN KEY (idUsuario) REFERENCES Usuario(id)
);

CREATE TABLE PostProyecto (
    id INT PRIMARY KEY,
    titulo VARCHAR(255),
    descripcion TEXT,
    duracionEstimada INT,
    limiteUsuarios INT,
    rutaLogotipo VARCHAR(255),
    fechaCreacion DATE,
    estado ENUM("inicializado", "finalizado", "cancelado", "buscando" ),
    idUsuario INT,
    idPlataforma INT,
    FOREIGN KEY (idUsuario) REFERENCES Usuario(id),
    FOREIGN KEY (idPlataforma) REFERENCES Plataforma(id)
);

CREATE TABLE Comentario (
    id INT PRIMARY KEY,
    contenido TEXT,
    fechaCreacion DATE,
    idUsuario INT,
    idPostProyecto INT NULL,
    idPostForo INT NULL,
    FOREIGN KEY (idUsuario) REFERENCES Usuario(id),
    FOREIGN KEY (idPostProyecto) REFERENCES PostProyecto(id),
    FOREIGN KEY (idPostForo) REFERENCES PostForo(id)
);

CREATE TABLE Plataforma (
    id INT PRIMARY KEY,
    nombre VARCHAR(255)
);

CREATE TABLE ParticipacionProyecto (
    id INT PRIMARY KEY,
    estadoParticipacion ENUM("pendiente", "aceptado", "rechazado") DEFAULT "pendiente",
    idUsuario INT,
    idPostProyecto INT,
    FOREIGN KEY (idUsuario) REFERENCES Usuario(id),
    FOREIGN KEY (idPostProyecto) REFERENCES PostProyecto(id)
);

CREATE TABLE Chat (
    id INT PRIMARY KEY,
    nombre VARCHAR(255),
    grupal BOOLEAN DEFAULT FALSE
);

CREATE TABLE ChatUsuario (
    idChat INT,
    idUsuario INT,
    FOREIGN KEY (idChat) REFERENCES Chat(id),
    FOREIGN KEY (idUsuario) REFERENCES Usuario(id)
);

CREATE TABLE Mensajes (
    id INT PRIMARY KEY,
    contenido VARCHAR(280),
    fechaEnvio DATE,
    idChat INT,
    idUsuario INT,
    FOREIGN KEY (idChat) REFERENCES Chat(id),
    FOREIGN KEY (idUsuario) REFERENCES Usuario(id)
);

CREATE TABLE Notificacion (
    id INT PRIMARY KEY,
    contenido TEXT,
    fechaEnvio DATE,
    idUsuario INT,
    FOREIGN KEY (idUsuario) REFERENCES Usuario(id)
);

CREATE TABLE Reputacion (
    cantidad INT,
    idUsuario INT,
    FOREIGN KEY (idUsuario) REFERENCES Usuario(id)
);

CREATE TABLE Medalla (
    id INT PRIMARY KEY,
    nombre VARCHAR(255),
    descripcion TEXT,
    ruta VARCHAR(255),
);

CREATE TABLE UsuarioMedalla (
    fechaObtencion DATE,
    idUsuario INT,
    idMedalla INT,
    FOREIGN KEY (idUsuario) REFERENCES Usuario(id),
    FOREIGN KEY (idMedalla) REFERENCES Medalla(id)
);

CREATE TABLE Invitacion (
    id INT PRIMARY KEY,
    mensaje TEXT,
    fechaEnvio DATE,
    idUsuarioRemitente INT, -- Usuario que envia la invitacion
    idUsuarioReceptor INT, -- Usuario que recibe la invitacion
    idPostProyecto INT,
    FOREIGN KEY (idUsuarioRemitente) REFERENCES Usuario(id),
    FOREIGN KEY (idUsuarioReceptor) REFERENCES Usuario(id),
    FOREIGN KEY (idPostProyecto) REFERENCES PostProyecto(id)
);