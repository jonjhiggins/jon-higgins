(function() {

	'use strict';

	// Requires

		var Marionette = require('backbone.marionette'),
			Backbone = require('backbone'),
			homeController = require('./controllers/home'),
			workController = require('./controllers/work');

	// App

		window.jhApp = new Marionette.Application();

	// Router

		jhApp.Router = Marionette.AppRouter.extend({
			appRoutes: {
				'': 'showHome',
				'work': 'showWork'
			}
		});

		var API = {
			showHome: function() {
				jhApp.homeController.show();
			},
			showWork: function() {
				jhApp.workController.show();
			}
		};

	// Controllers

		jhApp.homeController = homeController();
		jhApp.workController = workController();

	// Views

		jhApp.on('start', function() {

			new jhApp.Router({
				controller: API
			});

			if (Backbone.history) {
				Backbone.history.start();
			}
		});

	// Start

		jhApp.start();

}());