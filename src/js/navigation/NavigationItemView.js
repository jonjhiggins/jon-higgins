var Marionette = require('backbone.marionette'),
	template = require('./NavigationItemTemplate.hbs'),
	NavigationItemView;

NavigationItemView = Marionette.ItemView.extend({
	template: template,
	tagName: 'li',
	className: 'navigation__item'
});

module.exports = NavigationItemView;
