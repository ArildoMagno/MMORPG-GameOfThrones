module.exports = function (application) {
	application.get('/jogo', function (req, res) {
		application.app.controllers.jogo.jogo(application, req, res);
	});
}