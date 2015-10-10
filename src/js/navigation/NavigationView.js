var Marionette = require('backbone.marionette'),
	template = require('./NavigationTemplate.hbs'),
    NavigationItemView = require('./NavigationItemView.js'),
	NavigationView;

NavigationView = Marionette.CompositeView.extend({
	template: template,
    childView: NavigationItemView,
    childViewOptions: function () {
    	return {
    		section: this.options.section
    	};
    }
});

module.exports = NavigationView;
