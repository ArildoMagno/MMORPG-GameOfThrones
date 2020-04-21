const mongoose = require('mongoose')
require("../models/JogoDAO")
const Jogo = mongoose.model("jogo")


module.exports.jogo = function (application, req, res) {

    if (req.session.autorizado) {
        res.render('jogo', { img_casa: req.session.casa });
    }
    else {
        res.send('Usuario precisa fazer login')
    }

}




module.exports.cadastrar = function (application, req, res) {

    var dadosForm = req.body;


    const novoJogo = new Jogo(
        {
            usuario: dadosForm.usuario,
            moeda: 15,
            suditos: 10,
            temor: Math.floor((Math.random() * 1000)),
            sabedoria: Math.floor((Math.random() * 1000)),
            moeda: Math.floor((Math.random() * 1000)),
            suditos: Math.floor((Math.random() * 1000)),
            magia: Math.floor((Math.random() * 1000)),
            comercio: Math.floor((Math.random() * 1000))
        }
    );


    novoJogo.save().then(() => {
        console.log('Salvo jogo');

    }).catch((err) => {
        console.log('erro : ' + err)
    })



}




module.exports.sair = function (application, req, res) {

    req.session.destroy((err) => {
        res.render("index", { validacao: {} });
    });


}