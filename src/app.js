const express = require('express');
require('express-async-errors');

const routes = require('./routes/router');
const { errorMiddleware } = require('./middlewares');

const app = express();

app.use(express.json());
app.use(routes);

app.use(errorMiddleware);

module.exports = app;
