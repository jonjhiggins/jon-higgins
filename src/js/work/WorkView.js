var Marionette = require('backbone.marionette'),
	template = require('./WorkTemplate.hbs'),
	WorkView;

WorkView = Marionette.CompositeView.extend({
	template: template
});

module.exports = WorkView;
