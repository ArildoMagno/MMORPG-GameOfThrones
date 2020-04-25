const mongoose = require('mongoose')
require("../models/UsuariosDAO")
const Usuario = mongoose.model("usuarios")
var jogo = require("./jogo")



module.exports.cadastro = function (application, req, res) {
    res.render('cadastro', { validacao: {}, dadosForm: {} });
}


module.exports.cadastrar = function (application, req, res) {

    var dadosForm = req.body;

    req.assert('nome', 'Nome não pode ser vazio').notEmpty();
    req.assert('usuario', 'Usuario não pode ser vazio').notEmpty();
    req.assert('senha', 'Senha não pode ser vazia').notEmpty();
    req.assert('casa', 'Casa não pode ser vazia').notEmpty();


    const erros = req.validationErrors();

    if (erros) {

        res.render('cadastro', { validacao: erros, dadosForm: dadosForm });
        return;
    } else {
        const novoUsuario = new Usuario(
            {
                usuario: dadosForm.usuario,
                nome: dadosForm.nome,
                senha: dadosForm.senha,
                casa: dadosForm.casa
            }
        );


        novoUsuario.save().then(() => {
          
            jogo.gerarParametros(application, req, res);


        }).catch((err) => {
            console.log('erro : ' + err)
        })
    }


    res.render('index');
}