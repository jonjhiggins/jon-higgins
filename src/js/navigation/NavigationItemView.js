var Marionette = require('backbone.marionette'),
	template = require('./NavigationItemTemplate.hbs'),
	NavigationItemView;

NavigationItemView = Marionette.ItemView.extend({
	template: template
});

module.exports = NavigationItemView;
