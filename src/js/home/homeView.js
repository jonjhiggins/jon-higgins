var Marionette = require('backbone.marionette'),
	template = require('./homeTemplate.hbs'),
	HomeView;

HomeView = Marionette.CompositeView.extend({
	template: template
});

module.exports = HomeView;
