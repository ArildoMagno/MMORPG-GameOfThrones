const mongoose = require('mongoose')
require("../models/JogoDAO")
const Jogo = mongoose.model("jogo")
const Acao = mongoose.model("acao")
require("../models/UsuariosDAO")
const Usuario = mongoose.model("usuarios")
var ObjectID = require('mongodb').ObjectID;





module.exports.jogo = function (application, req, res) {

    if (req.session.autorizado !== true) {
        res.send('Usuario precisa fazer login')
        return;
    }

    var msg = '';

    if (req.query.msg != '') {
        msg = req.query.msg;
    }




    this.iniciaJogo(res, req.session.usuario, req.session.casa, msg);




}





module.exports.iniciaJogo = function (res, usuario, casa, msg) {



    Jogo.findOne({ usuario: usuario }).lean().then((jogo) => {
        res.render('jogo', { img_casa: casa, jogo: jogo, msg: msg });



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





module.exports.ordenar_acao_sudito = function (application, req, res) {


    if (req.session.autorizado !== true) {
        res.send('Usuario precisa fazer login')
        return;
    }



    req.assert('acao', 'Ação não pode ser vazio').notEmpty();
    req.assert('quantidade', 'Quantidade não pode ser vazio').notEmpty();


    var erros = req.validationErrors();

    if (erros) {
        res.redirect('jogo?msg=A');
        return;
    }

    //acao aqui
    this.acao(application, req, res);
    res.redirect('jogo?msg=B')

}




module.exports.acao = function (application, req, res) {

    var dadosForm = req.body;
    dadosForm.usuario = req.session.usuario;
    var usuario = dadosForm.usuario;
    var acao = dadosForm.acao;
    var date = new Date();
    var tempo = null;


    switch (parseInt(acao)) {
        case 1: tempo = 1 * 60 * 60000; break;
        case 2: tempo = 2 * 60 * 60000; break;
        case 3: tempo = 5 * 60 * 60000; break;
        case 4: tempo = 5 * 60 * 60000; break;
    }


    //acao
    const novaAcao = new Acao(
        {
            usuario: usuario,
            acao: acao,
            quantidade: dadosForm.quantidade,
            acao_termina_em: date.getTime() + tempo
        }
    );


    novaAcao.save().then(() => {


    }).catch((err) => {
        console.log('erro : ' + err)
    })

    var moedas = null;
    switch (parseInt(acao)) {
        case 1: moedas = -2 * (novaAcao.quantidade); break;
        case 2: moedas = -3 * (novaAcao.quantidade); break;
        case 3: moedas = -1 * (novaAcao.quantidade); break;
        case 4: moedas = -1 * (novaAcao.quantidade); break;
    }



    Jogo.findOne({ usuario: usuario }).lean().then((jogo) => {

        var query = { 'usuario': usuario };
        moedas = parseInt(jogo.moeda) + (parseInt(moedas));
        Jogo.findOneAndUpdate(query, { moeda: moedas }, function (err, doc) {

        });

    })




    //  console.log('-->' + moedas)
    //console.log('\n\n--->' + moedas + '-->antiga' + moedaAntiga);







}



module.exports.revogar_acao = function (application, req, res) {

    var url_query = req.query;
    var _id = url_query.id_acao;



    var query = { '_id': ObjectID(_id) };

    Acao.findOneAndDelete(query, {}, function (err, doc) {
        res.redirect("jogo?msg=D");
    }).catch((err) => {
        console.log('err: ' + err);
    });


}







//ROTAS


module.exports.sair = function (application, req, res) {

    req.session.destroy((err) => {
        res.render("index", { validacao: {} });
    });


}



module.exports.suditos = function (application, req, res) {
    if (req.session.autorizado !== true) {
        res.send('Usuario precisa fazer login')
        return;
    }
    res.render("aldeoes", { validacao: {} });


}


module.exports.getAcoes = function (application, req, res) {

    var usuario = req.session.usuario;
    var data = new Date();
    var momentoAtual = data.getTime();

    Acao.find({ usuario: usuario, acao_termina_em: { $gt: momentoAtual } }).lean().then((acao) => {

        res.render("pergaminhos", { acoes: acao });

    })


}




module.exports.pergaminhos = function (application, req, res) {
    if (req.session.autorizado !== true) {
        res.send('Usuario precisa fazer login')
        return;
    }


    /* recuperar as acoes inseridas no banco de dados */


    this.getAcoes(application, req, res);


}