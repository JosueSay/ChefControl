import { Meteor } from "meteor/meteor";
import { pg } from "meteor/numtel:pg";
import { WebApp } from 'meteor/webapp';
import { query } from './conn'; // Conexión a la db

// Endpoint para probar la conexión
WebApp.connectHandlers.use('/testdb', (req, res) => {
    query('SELECT 1')
    .then(() => {
        res.writeHead(200);
        res.end('Conexión exitosa a la base de datos.');
    })
    .catch((err) => {
        res.writeHead(500);
        res.end('Error al conectar a la base de datos: ' + err.message);
    });
});

