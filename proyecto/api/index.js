'use strict '

var mongoose = require('mongoose');
var app = require ('./app');
var port = 3800;

// Conexión Database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/proyecto', {useNewUrlParser: true})
        .then(()=> {
            console.log("La conexión a la base de datos proyecto se ha realizado correctamente!!")
        
            // Crear servidor
            app.listen(port, () => {
                console.log("Servidor corriendo en http://localhost:3800");
            });
        })
        .catch(err => console.log(err));