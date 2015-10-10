var Marionette = require('backbone.marionette'),
	HomeView = require('./homeView'),
	commands = require('../config/commands'),
	HomeController,
    moduleName = 'Home';

HomeController = Marionette.Controller.extend({
	initialize: function() {

    },
    showHome: function() {
        this.view = new HomeView();

        commands.execute('app:screen:show', this.view);
        commands.execute('app:navigation:update', moduleName);
        commands.execute('app:title', moduleName);
    }
});

module.exports = HomeController;