var Marionette = require('backbone.marionette'),
    Backbone = require('backbone'),
    commands = require('../config/commands'),
	NavigationView = require('./navigationView'),
    NavigationItem = require('./NavigationItem'),
    NavigationItems =require('./NavigationItems'),
    siteData = require('../../data/site.json'),
	NavigationController;

NavigationController = Marionette.Controller.extend({
	initialize: function() {
        this.buildNavigationItems();
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
    	this.view = new NavigationView({collection: this.navigationItems});
        return this.view;
    }
});

module.exports = NavigationController;