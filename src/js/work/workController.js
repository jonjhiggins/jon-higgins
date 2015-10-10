var Marionette = require('backbone.marionette'),
	WorkView = require('./workView'),
	commands = require('../config/commands'),
	WorkController,
    moduleName = 'Work';

WorkController = Marionette.Controller.extend({
	initialize: function() {

    },
    showWork: function() {
    	this.view = new WorkView();

        commands.execute('app:screen:show', this.view);
        commands.execute('app:navigation:update', moduleName);
        commands.execute('app:title', moduleName);
    }
});

module.exports = WorkController;