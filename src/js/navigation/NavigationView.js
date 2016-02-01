var Marionette = require('backbone.marionette'),
    NavigationItemView = require('./NavigationItemView.js'),
	NavigationView;

NavigationView = Marionette.CompositeView.extend({
    tagName: 'ul',
    className: 'navigation__list',
    childView: NavigationItemView,
    childViewOptions: function () {
    	return {
    		section: this.options.section
    	};
    }
});

module.exports = NavigationView;
