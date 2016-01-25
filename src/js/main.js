'use strict';

// Requires

	var Marionette = require('backbone.marionette'),
		Backbone = require('backbone'),
		app = require('./app'),
		commands = require('./config/commands'),
		siteData = require('../data/site.json'),
		HomeModule = require('./Home/HomeModule'),
		WorkModule = require('./Work/WorkModule'),
		WhoModule = require('./Who/WhoModule'),
		NavigationModule = require('./Navigation/NavigationModule');

// Modules

	app.module('home', HomeModule);
	app.module('work', WorkModule);
	app.module('who', WhoModule);
	app.module('navigation', NavigationModule);

	/*globals console*/

// Command handlers

	commands.setHandler('app:screen:show', function(view) {
	    app.mainRegion.show(view);
	});

	commands.setHandler('app:navigation:update', function(section) {
		var view = app.navigation.showNavigation(section);
	    app.navigationRegion.show(view);
	});

	// Set <title> tag
	commands.setHandler('app:title', function(title) {
		var formattedTitle = title !== 'Home' ? ' | ' + title : '';
	    document.title = siteData.siteName + formattedTitle;
	});


// Start App

	app.start();
	// Turn on HTML5 pushState / turn off hashbang
	Backbone.history.start({ pushState: true });
