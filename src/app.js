// ************ Require's ************
const express = require('express');
const path = require('path');

// Method Override - Delete & Put
const methodOverride = require('method-override');
const session = require('express-session');//import session to create user session
const cookieParser = require('cookie-parser');
const rememberMiddleware = require('./middlewares/cookieAuthMiddleware');

const port = process.env.PORT || 3500; //Heroku port

// ************ Express() ************
const app = express();

// ************ Middlewares ************
app.use(express.static(path.join(__dirname, '../public')));  // Necesario para los archivos estáticos en el folder /public
app.use(express.urlencoded({ extended: false })); // Para poder leer el body
app.use(express.json()); // Para poder leer el body

//Put and Delete
app.use(methodOverride('_method'));

//Middleware for session data
app.use(session({
  secret: "mensajesecreto",
  resave: false,
  saveUninitialized: false
                      
}));
app.use(cookieParser());
app.use(rememberMiddleware);

// ************ Template Engine ************
app.set('view engine', 'ejs'); // Define que el motor que utilizamos es EJS
app.set('views', path.join(__dirname, '/views')); // Define la ubicación de la carpeta de las Vistas

// ************ Route System require and use() ************
const mainRouter = require('./routes/main'); // Rutas main

app.use('/', mainRouter);

// ************ Set the server to listen ************
app.listen(port, () => {
  console.log("Servidor funcionando en http://localhost:3500")
})