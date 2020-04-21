module.exports = function(application){
	application.get('/jogo', function(req, res){
		res.render('jogo');
	});
}