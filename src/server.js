require('dotenv').config();
const app = require('./app');

// não remova a variável `API_PORT` ou o `listen`
const port = process.env.API_PORT || 3001;

// não remova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.get('/status', (_req, res) => res.status(200).send({ message: '[Healthy] - API on!!!' }));

app.listen(port, () => console.log('ouvindo porta', port));
