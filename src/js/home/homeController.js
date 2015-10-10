var Marionette = require('backbone.marionette'),
	HomeView = require('./homeView'),
	commands = require('../config/commands'),
	HomeController;

HomeController = Marionette.Controller.extend({
	initialize: function() {

    },
    showHome: function() {
    	if (!this.view) {
    		this.view = new HomeView();
    		commands.execute('app:screen:show', this.view);
            commands.execute('app:title', null);
    	}
    }
});

module.exports = HomeController;