var Marionette = require('backbone.marionette'),
    Backbone = require('backbone'),
    commands = require('../config/commands'),
    Navigation = require('./Navigation'),
	NavigationView = require('./navigationView'),
    NavigationItem = require('./NavigationItem'),
    NavigationItems =require('./NavigationItems'),
    siteData = require('../../data/site.json'),
	NavigationController;

NavigationController = Marionette.Controller.extend({
	initialize: function() {
        this.buildNavigationItems();
        this.showNavigation();
    },

    buildNavigationItems: function() {
        var navigationItemsArray = [];

        siteData.navigation.forEach(function (item) {
           var newItem = new NavigationItem({title: item.title, link: item.link});
           navigationItemsArray.push(newItem);
        });

        this.navigationItems = new NavigationItems(navigationItemsArray);
    },

    showNavigation: function(section) {
        this.model = new Navigation({
            section: section
        });
    	this.view = new NavigationView({
            collection: this.navigationItems,
            model: this.model
        });
        commands.execute('app:navigation:show', this.view);
    },

    updateNavigation: function(section) {
        this.model.set('section', section);
    }
});

module.exports = NavigationController;
