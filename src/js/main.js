'use strict';

// Requires

	var Marionette = require('backbone.marionette'),
		Backbone = require('backbone'),
		app = require('./app'),
		commands = require('./config/commands'),
		siteData = require('../data/site.json'),
		HomeModule = require('./Home/HomeModule'),
		WorkModule = require('./Work/WorkModule'),
		WhoModule = require('./Who/WhoModule');

// Modules

	app.module('home', HomeModule);
	app.module('work', WorkModule);
	app.module('who', WhoModule);

	/*globals console*/

// Command handlers

	commands.setHandler('app:screen:show', function(view) {
	    app.mainRegion.show(view);
	});

	// Set <title> tag
	commands.setHandler('app:title', function(title) {
		var formattedTitle = title ? ' | ' + title : '';
	    document.title = siteData.siteName + formattedTitle;
	});


// Start App

	app.start();
	Backbone.history.start();