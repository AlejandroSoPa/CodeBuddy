// const express = require('express');
// const cors = require("cors");
// require('dotenv').config();

import express, { json } from 'express';
import cors from 'cors';
import { config } from 'dotenv';

import { createRouter } from './routes/routes.js';

config(); // inicializar dotenv

const app = express();
app.use(json());
app.use(cors());
app.disable('x-powered-by'); // deshabilitar el header X-Powered-By: Express (seguridad)

app.use("/api/v1", createRouter());

// app.get('/', (req, res) => {
//     res.send("Hello World!");
// });

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});