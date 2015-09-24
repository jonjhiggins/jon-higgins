(function() {

	'use strict';

	// Requires

		var Marionette = require('backbone.marionette'),
			Backbone = require('backbone'),
			homeController = require('./controllers/home');

	// App

		window.jhApp = new Marionette.Application();

	// Controllers

		jhApp.homeController = homeController();
}());