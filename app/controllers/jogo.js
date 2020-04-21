const mongoose = require('mongoose')
require("../models/JogoDAO")
const Jogo = mongoose.model("jogo")









module.exports.jogo = function (application, req, res) {

    if (req.session.autorizado !== true) {
        res.send('Usuario precisa fazer login')
        return;
    }




    this.iniciaJogo(res, req.session.usuario, req.session.casa);




}





module.exports.iniciaJogo = function (res, usuario, casa) {




    Jogo.findOne({ usuario: usuario }).lean().then((jogo) => {

        res.render('jogo', { img_casa: casa, jogo: jogo });



    })


}





module.exports.gerarParametros = function (application, req, res) {

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


    }).catch((err) => {
        console.log('erro : ' + err)
    })



}




//ROTAS


module.exports.sair = function (application, req, res) {

    req.session.destroy((err) => {
        res.render("index", { validacao: {} });
    });


}



module.exports.suditos = function (application, req, res) {
    res.render("aldeoes", { validacao: {} });


}





module.exports.pergaminhos = function (application, req, res) {
    res.render("pergaminhos", { validacao: {} });


}