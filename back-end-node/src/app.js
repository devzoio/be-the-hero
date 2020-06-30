const express = require('express');
const cors = require('cors');
const { errors } = require('celebrate');
const routes = require('./routes');

const app = express();

app.use(cors(/**{
    origin: ''
}*/))

//ativa a utilização do json na aplicação
app.use(express.json());

//roda as rotas
app.use(routes);

//exibir erros internos
app.use(errors());

//ouve o servidor
module.exports = app;