import express, { json } from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import limite from 'express-rate-limit'
import compresor from 'compression';

import { createRouter } from './routes/routes.js';

//import {conexionBBDD} from "/utils/modelUtils.js"

//const connection = conexionBBDD()

config(); // inicializar dotenv

const app = express();

// Configuracion Autenticacion Google
/*
passport.use(new GoogleStrategy({
  clientID: process.env.clientID,
  clientSecret: process.env.secretGoogle,
  callbackURL: "http://codebuddy.ieti.site/auth/google/callback",
  scope: ['profile', 'email']
},
function(accessToken, refreshToken, profile, done) {
  connection.query('SELECT * FROM AuthGoogle WHERE google_id = ?', [profile.id], function(err, results) {
    if (err) {
      return done(err);
    }

    if (results.length === 0) {
      // Insertar nuevo usuario en la base de datos
      connection.query('INSERT INTO AuthGoogle (google_id, email, name, profile_picture) VALUES (?, ?, ?, ?)', [profile.id, profile.email, profile.displayName, profile.photos[0].value], function(err) {
        if (err) {
          return done(err);
        }

        return done(null, { id: profile.id, email: profile.email, name: profile.displayName, profile_picture: profile.photos[0].value });
      });
    } else {
      // Usuario existente
      return done(null, results[0]);
    }
  });
}));

app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback', passport.authenticate('google', {
  successRedirect: '/profile',
  failureRedirect: '/login'
}));
*/
// Define el middleware de express-rate-limit
const limitador = limite({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5000, // número máximo de solicitudes
  handler: function (req, res, next) {
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