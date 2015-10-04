var Marionette = require('backbone.marionette'),
	template = require('./HomeTemplate.hbs'),
	HomeView;

HomeView = Marionette.CompositeView.extend({
	template: template
});

module.exports = HomeView;
