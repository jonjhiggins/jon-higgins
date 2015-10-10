var Marionette = require('backbone.marionette'),
	WorkView = require('./workView'),
	commands = require('../config/commands'),
	WorkController;

WorkController = Marionette.Controller.extend({
	initialize: function() {

    },
    showWork: function() {
    	if (!this.view) {
    		this.view = new WorkView();
    		commands.execute('app:screen:show', this.view);
            commands.execute('app:title', 'Work');
    	}
    }
});

module.exports = WorkController;