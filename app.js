import express, { json } from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import limite from 'express-rate-limit'
import compresor from 'compression';

import { createRouter } from './routes/routes.js';

config(); // inicializar dotenv

const app = express();

// Define el middleware de express-rate-limit
const limitador = limite({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 5000, // número máximo de solicitudes
    handler: function(req, res, next) {
      // Redirige a una pantalla de error personalizada
      res.status(429).sendFile(__dirname + '/public/error429.html');
    }
});

app.use(json());
app.use(cors());
app.use(compresor());
app.use(limitador);
app.disable('x-powered-by'); // deshabilitar el header X-Powered-By: Express (seguridad)

app.use("/", createRouter());

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on https://codebuddy.ieti.site/api/v1 or http://localhost:${port}`);
});