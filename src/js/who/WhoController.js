var Marionette = require('backbone.marionette'),
	WhoView = require('./whoView'),
	commands = require('../config/commands'),
	WhoController;

WhoController = Marionette.Controller.extend({
	initialize: function() {

    },
    showWho: function() {
    	if (!this.view) {
    		this.view = new WhoView();
    		commands.execute('app:screen:show', this.view);
            commands.execute('app:title', 'Who');
    	}
    }
});

module.exports = WhoController;