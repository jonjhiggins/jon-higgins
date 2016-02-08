var Marionette = require('backbone.marionette'),
	template = require('./NavigationTemplate.hbs'),
    NavigationItemView = require('./NavigationItemView.js'),
	$ = require('jQuery'),
	NavigationView;

NavigationView = Marionette.CompositeView.extend({
	template: template,
    tagName: 'ul',
    className: 'navigation__list',
    childView: NavigationItemView,
    childViewOptions: function () {
    	return {
    		section: this.model.get('section')
    	};
    },
	modelEvents: {
		'change': 'sectionChange'
	},
	sectionChange: function() {

		var $links = this.$el.find('.navigation__link'),
			section = this.model.get('section');

		$links.removeClass('active');
		$links.each(function(index, item) {
			var $item = $(item);
			if ($item.text() === section) {
				$item.addClass('active');
				return;
			}
		});
	}
});

module.exports = NavigationView;
