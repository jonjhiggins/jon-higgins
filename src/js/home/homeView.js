(function() {

	'use strict';

	var Marionette = require('backbone.marionette'),
		Backbone = require('backbone');

	module.exports = function(jhApp) {
		return {
			init: function() {
				jhApp.titleView = Marionette.ItemView.extend({
					el: '#main',
					template: '#home__title'
				});
			}
		};
	};

}());