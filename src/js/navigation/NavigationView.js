var Marionette = require('backbone.marionette'),
	template = require('./NavigationTemplate.hbs'),
    NavigationItemView = require('./NavigationItemView.js'),
	NavigationView;

NavigationView = Marionette.CompositeView.extend({
	template: template,
    childView: NavigationItemView
});

module.exports = NavigationView;
