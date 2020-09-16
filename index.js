const express = require('express');
const path = require('path');
const morgan = require('morgan');
const app = express();


//Middlewares
app.use(morgan('dev')); //Monitorear peticiones
app.use(express.json()) //Peticiones en formato json

//Routes
app.use('/api/', require('./routes/movies'))

app.set('port', 4001);
app.listen(app.get('port'), ()=>{
  console.log('Servidor está funcionando')
})