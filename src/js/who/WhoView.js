var Marionette = require('backbone.marionette'),
	template = require('./WhoTemplate.hbs'),
	WhoView;

WhoView = Marionette.CompositeView.extend({
	template: template
});

module.exports = WhoView;
