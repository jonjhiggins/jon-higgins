var homeView = require('./homeView'),
	homeController = {};

module.exports = function(jhApp) {

	homeView(jhApp).init();

	homeController = {
		homeView: homeView(jhApp),
		show: function() {
			var staticView = new jhApp.titleView();
			staticView.render();
			return true;
		}
	};

	return homeController;
};