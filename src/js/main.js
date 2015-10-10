'use strict';

// Requires

	var Marionette = require('backbone.marionette'),
		Backbone = require('backbone'),
		app = require('./app'),
		commands = require('./config/commands'),
		HomeModule = require('./Home/HomeModule'),
		WorkModule = require('./Work/WorkModule'),
		WhoModule = require('./Who/WhoModule');

// Modules

	app.module('home', HomeModule);
	app.module('work', WorkModule);
	app.module('who', WhoModule);

// Command handlers

	commands.setHandler('app:screen:show', function(view) {
	    app.mainRegion.show(view);
	});

	commands.setHandler('app:title', function(title) {
	    document.title = title;
	});


// Start App

	app.start();
	Backbone.history.start();