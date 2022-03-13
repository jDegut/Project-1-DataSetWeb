const express = require('express');
const cors = require('cors');
const path = require('path');

const DBConnect = require('./connectToDB.js');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
const port = 3000;


/**
 * Récupération des fichiers src (css, js)
 */

app.use(express.static(path.join(__dirname, '../site')));


/**
 * Routes vers les pages webs affichées
 */

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../site/pages/index.html'));
});


/**
 * Routes vers les requêtes au serveur
 */

//Requête SELECT
app.get('/query/select/*', (req, res) => {

    let params = Object.values(req.params)[0];
    DBConnect.querySelectSimple(JSON.parse(params)).then((queryResult) => {
        res.json(queryResult);
    });
});

//Requête SELECT (juste pour un nom)
app.get('/query/selectAll/*', (req, res) => {

    let params = Object.values(req.params)[0];
    DBConnect.querySelectAll(JSON.parse(params)).then((queryResult) => {
        res.json(queryResult);
    });
});

//Requête d'autocomplétion à la saisie du nom
app.get('/query/autocompletion/*', (req, res) => {

    let params = Object.values(req.params)[0];
    DBConnect.queryAutocompletion(JSON.parse(params)).then((queryResult) => {
        res.json(queryResult);
    });
});


/**
 * Ecoute de port pour le serveur
 */

app.listen(port, () => {
    console.log(`Serveur en ligne à l'adresse suivante : http://localhost:${port}`);
});