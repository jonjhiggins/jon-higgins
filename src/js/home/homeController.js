var Marionette = require('backbone.marionette'),
	HomeView = require('./homeView'),
	commands = require('../config/commands'),
	HomeController;

HomeController = Marionette.Controller.extend({
	initialize: function() {
		/*globals console:true*/
        console.log('initHome');
    },
    showHome: function() {
    	if (!this.view) {
    		this.view = new HomeView();
    		commands.execute('app:screen:show', this.view);
    	}
    	console.log('showHome');
    }
});

module.exports = HomeController;