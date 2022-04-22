const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor ejecutandose en el puerto ${PORT}`);
});

app.use(express.static('assets'));

//RUTA GET - Archivo.SON
app.get('/abracadabra/usuarios', (req, res) => {
  res.sendFile(__dirname + '/usuarios.json');
});

//RUTA GET . VALIDAR USUARIO para JUGAR
app.use('/abracadabra/juego/:nombre', (req, res, next) => {
  const { nombre } = req.params;
  // console.log('nombre', nombre);

  const users = JSON.parse(fs.readFileSync('./usuarios.json', 'utf-8'));
  const lista = users.usuarios.filter((u) => u == nombre);

  // console.log('users', users);
  // console.log('lista', lista);

  nombre == lista ? next() : res.redirect('/who.jpeg');
});
// METODO GET - DESPUES DEL NEXT
app.get('/abracadabra/juego/:nombre', (req, res, next) => {
  res.sendFile(__dirname + '/index.html');
});

//RUTA JUEGO, Este bloque debe ir y declarar antes de la validacion de usuarios
app.get('/abracadabra/conejo/:n', (req, res) => {
  const random = Math.floor(Math.random() * (5 - 1)) + 1;
  const n = req.params.n;
  n == random ? res.redirect('/conejito.jpg') : res.redirect('/voldemort.jpg');
});

//RUTA GET - ERROR
app.get('*', (req, res) => {
  res.send(`<center><h1>PAGINA NO ENCONTRADA.!</h1><center>
    <center><h1 style="color:red">ERROR 404</h1><center`);
});
