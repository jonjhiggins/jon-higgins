var Marionette = require('backbone.marionette'),
	template = require('./NavigationItemTemplate.hbs'),
	NavigationItemView;

NavigationItemView = Marionette.ItemView.extend({
	template: template,
	tagName: 'li',
	className: 'navigation__item',
	templateHelpers: function () {
		return {
			active: this.options.section === this.model.get('title')
		};
	}
});

module.exports = NavigationItemView;
