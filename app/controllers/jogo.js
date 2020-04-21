module.exports.jogo = function (application, req, res) {

    if (req.session.autorizado) {
        res.render('jogo');
    }
    else {
        res.send('Usuario precisa fazer login')
    }

}


module.exports.sair = function (application, req, res) {

    req.session.destroy((err) => {
        res.render("index", { validacao: {} });
    });


}