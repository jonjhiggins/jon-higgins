var Marionette = require('backbone.marionette'),
	WhoView = require('./whoView'),
	commands = require('../config/commands'),
	WhoController,
    moduleName = 'Who';

WhoController = Marionette.Controller.extend({
	initialize: function() {

    },
    showWho: function() {
    	this.view = new WhoView();

        commands.execute('app:screen:show', this.view);
        commands.execute('app:navigation:update', moduleName);
        commands.execute('app:title', moduleName);
    }
});

module.exports = WhoController;