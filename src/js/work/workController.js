var Marionette = require('backbone.marionette'),
	WorkView = require('./workView'),
	commands = require('../config/commands'),
	WorkController;

WorkController = Marionette.Controller.extend({
	initialize: function() {
		/*globals console:true*/
        console.log('initWork');
    },
    showWork: function() {
    	if (!this.view) {
    		this.view = new WorkView();
    		commands.execute('app:screen:show', this.view);
    	}
    	console.log('showWork');
    }
});

module.exports = WorkController;