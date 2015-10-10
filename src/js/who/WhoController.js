var Marionette = require('backbone.marionette'),
	WhoView = require('./whoView'),
	commands = require('../config/commands'),
	WhoController;

WhoController = Marionette.Controller.extend({
	initialize: function() {
		/*globals console:true*/
        console.log('initWho');
    },
    showWho: function() {
    	if (!this.view) {
    		this.view = new WhoView();
    		commands.execute('app:screen:show', this.view);
    	}
    	console.log('showWho');
    }
});

module.exports = WhoController;