/* importar as configurações do servidor */
var app = require('./config/server');
require('./app/controllers')
require('express');

// Using Node.js `require()`
const mongoose = require('mongoose')
const db = require("./config/dbConnection")


//conecta ao banco
mongoose.connect(db.mongoURI, { useNewUrlParser: true }).then(() => { console.log("Conectado ao mongo\n\n") }).catch((err) => { console.log("ERRROOO AO CONECTAR : " + err) })




/* parametrizar a porta de escuta */
const PORT = process.env.PORT || 80;
app.listen(PORT, function () {
	console.log('Servidor online');
})