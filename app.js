/* importar as configurações do servidor */
var app = require('./config/server');
var express = require("express");

// Using Node.js `require()`
const mongoose = require('mongoose')
const db = require("./config/dbConnection")


//conecta ao banco
mongoose.connect(db.mongoURI, { useNewUrlParser: true }).then(() => { console.log("Conectado ao mongo\n\n") }).catch((err) => { console.log("ERRROOO AO CONECTAR : " + err) })




/* parametrizar a porta de escuta */
app.listen(80, function(){
	console.log('Servidor online');
})