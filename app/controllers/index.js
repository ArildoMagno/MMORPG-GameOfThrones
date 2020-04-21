const mongoose = require('mongoose')
require("../models/UsuariosDAO")
const Usuario = mongoose.model("usuarios")

module.exports.index = function (application, req, res) {
    res.render('index', { validacao: {} });
}


module.exports.autenticar = function (application, req, res) {
    var dadosForm = req.body;


    req.assert('usuario', 'Usuario não pode ser vazio').notEmpty();
    req.assert('senha', 'Senha não pode ser vazia').notEmpty();
    const erros = req.validationErrors();

    if (erros) {
        res.render('index', { validacao: erros, dadosForm: dadosForm });
        return;
    }

    Usuario.findOne({ usuario: dadosForm.usuario, senha: dadosForm.senha }).lean().then((usuario) => {
        console.log('\t conteudo:' + JSON.stringify(usuario) + '\t tipo: ' + typeof (usuario))
        if (usuario != undefined) {
            req.session.autorizado = true;
            req.session.usuario = usuario.usuario;
        }

        if (req.session.autorizado) {
            res.redirect("jogo")
        } else {
            res.render("index", { validacao: {} });
        }

    })





}