const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/notes-db-app')
    .then(db => console.log('La base de datos esta conectada'))
    .catch(err => console.error(err))