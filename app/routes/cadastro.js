module.exports = function(application){
	application.get('/cadastro', function(req, res){
		res.render('cadastro');
	});
}