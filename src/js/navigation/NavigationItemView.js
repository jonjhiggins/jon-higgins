var Marionette = require('backbone.marionette'),
	template = require('./NavigationItemTemplate.hbs'),
	NavigationItemView;

// 	var HandlebarsCompiler = require('hbsfy/runtime');

// 		//console.log(HandlebarsCompiler.helper);

// HandlebarsCompiler.registerHelper('md', require('helper-md'));


NavigationItemView = Marionette.ItemView.extend({
	template: template,
	tagName: 'li',
	className: function() {
		return 'navigation__item navigation__item--' + this.model.get('title').toLowerCase();
	},
	templateHelpers: function () {
		return {
			active: this.options.section === this.model.get('title')
		};
	}
});

module.exports = NavigationItemView;
