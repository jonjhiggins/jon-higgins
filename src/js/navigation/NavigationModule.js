var Marionette = require('backbone.marionette'),
	Backbone = require('backbone'),
	NavigationController = require('./NavigationController'),
	NavigationModule;

NavigationModule = Marionette.Module.extend({

	initialize: function() {
        this.controller = new NavigationController({});
    },

    updateNavigation: function(section) {
        return this.controller.updateNavigation(section);
    },

    showNavigation: function(section) {
        return this.controller.showNavigation(section);
    }

});

module.exports = NavigationModule;
