var Marionette = require('backbone.marionette'),
	NavigationView = require('./navigationView'),
	commands = require('../config/commands'),
	NavigationController;

NavigationController = Marionette.Controller.extend({
	initialize: function() {

    },
    showNavigation: function(section) {
    	this.view = new NavigationView({"section": section});
        return this.view;
    }
});

module.exports = NavigationController;