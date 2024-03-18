CREATE TABLE Idiomas (
    id INT PRIMARY KEY,
    nombre VARCHAR(255)
);

CREATE TABLE Nivel (
    id INT PRIMARY KEY,
    nombre ENUM("estudiante", "profesional", "hobbie")
);

CREATE TABLE Usuario (
    id VARCHAR(255) PRIMARY KEY,
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
    FOREIGN KEY (idIdioma) REFERENCES Idiomas(id),
    FOREIGN KEY (idNivel) REFERENCES Nivel(id)

);

CREATE TABLE Plataforma (
    id INT PRIMARY KEY,
    nombre VARCHAR(255)
);

CREATE TABLE PostForo (
    id VARCHAR(255) PRIMARY KEY,
    texto TEXT,
    idUsuario VARCHAR(255),
    fechaCreacion DATE,
    FOREIGN KEY (idUsuario) REFERENCES Usuario(id)
);

CREATE TABLE PostProyecto (
    id VARCHAR(255) PRIMARY KEY,
    titulo VARCHAR(255),
    descripcion TEXT,
    duracionEstimada INT,
    limiteUsuarios INT,
    rutaLogotipo VARCHAR(255),
    fechaCreacion DATE,
    estado ENUM("inicializado", "finalizado", "cancelado", "buscando" ),
    idUsuario VARCHAR(255),
    idPlataforma INT,
    FOREIGN KEY (idUsuario) REFERENCES Usuario(id),
    FOREIGN KEY (idPlataforma) REFERENCES Plataforma(id)
);

CREATE TABLE Comentario (
    id VARCHAR(255) PRIMARY KEY,
    contenido TEXT,
    fechaCreacion DATE,
    idUsuario VARCHAR(255),
    idPostProyecto VARCHAR(255) NULL,
    idPostForo VARCHAR(255) NULL,
    FOREIGN KEY (idUsuario) REFERENCES Usuario(id),
    FOREIGN KEY (idPostProyecto) REFERENCES PostProyecto(id),
    FOREIGN KEY (idPostForo) REFERENCES PostForo(id)
);

CREATE TABLE ParticipacionProyecto (
    id VARCHAR(255) PRIMARY KEY,
    estadoParticipacion ENUM("pendiente", "aceptado", "rechazado") DEFAULT "pendiente",
    idUsuario VARCHAR(255),
    idPostProyecto VARCHAR(255),
    FOREIGN KEY (idUsuario) REFERENCES Usuario(id),
    FOREIGN KEY (idPostProyecto) REFERENCES PostProyecto(id)
);

CREATE TABLE Chat (
    id VARCHAR(255) PRIMARY KEY,
    nombre VARCHAR(255),
    grupal BOOLEAN DEFAULT FALSE
);

CREATE TABLE ChatUsuario (
    idChat VARCHAR(255),
    idUsuario VARCHAR(255),
    FOREIGN KEY (idChat) REFERENCES Chat(id),
    FOREIGN KEY (idUsuario) REFERENCES Usuario(id)
);

CREATE TABLE Mensajes (
    id VARCHAR(255) PRIMARY KEY,
    contenido VARCHAR(280),
    fechaEnvio DATE,
    idChat VARCHAR(255),
    idUsuario VARCHAR(255),
    FOREIGN KEY (idChat) REFERENCES Chat(id),
    FOREIGN KEY (idUsuario) REFERENCES Usuario(id)
);

CREATE TABLE Notificacion (
    id VARCHAR(255) PRIMARY KEY,
    contenido TEXT,
    fechaEnvio DATE,
    idUsuario VARCHAR(255),
    FOREIGN KEY (idUsuario) REFERENCES Usuario(id)
);

CREATE TABLE Reputacion (
    cantidad INT,
    idUsuario VARCHAR(255),
    FOREIGN KEY (idUsuario) REFERENCES Usuario(id)
);

CREATE TABLE Medalla (
    id VARCHAR(255) PRIMARY KEY,
    nombre VARCHAR(255),
    descripcion TEXT,
    ruta VARCHAR(255)
);

CREATE TABLE UsuarioMedalla (
    fechaObtencion DATE,
    idUsuario VARCHAR(255),
    idMedalla VARCHAR(255),
    FOREIGN KEY (idUsuario) REFERENCES Usuario(id),
    FOREIGN KEY (idMedalla) REFERENCES Medalla(id)
);

CREATE TABLE Invitacion (
    id VARCHAR(255) PRIMARY KEY,
    mensaje TEXT,
    fechaEnvio DATE,
    idUsuarioRemitente VARCHAR(255), -- Usuario que envia la invitacion
    idUsuarioReceptor VARCHAR(255), -- Usuario que recibe la invitacion
    idPostProyecto VARCHAR(255),
    FOREIGN KEY (idUsuarioRemitente) REFERENCES Usuario(id),
    FOREIGN KEY (idUsuarioReceptor) REFERENCES Usuario(id),
    FOREIGN KEY (idPostProyecto) REFERENCES PostProyecto(id)
);

CREATE TABLE AuthGoogle (
    id INT PRIMARY KEY,
    googleId VARCHAR(255) UNIQUE,
    email VARCHAR(255),
    name VARCHAR(255),
    profilePicture VARCHAR(255),
    idUsuario VARCHAR(255),
    FOREIGN KEY (idUsuario) REFERENCES Usuario(id)
);