var Marionette = require('backbone.marionette'),
	Backbone = require('backbone'),
	tpl = require('./homeTemplate.hbs');

module.exports = function(jhApp) {
	return {
		init: function() {
			jhApp.titleView = Marionette.ItemView.extend({
				el: '#main',
				template: tpl
			});
		}
	};
};