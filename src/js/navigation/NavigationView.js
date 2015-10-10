var Marionette = require('backbone.marionette'),
	template = require('./NavigationTemplate.hbs'),
	NavigationView;

NavigationView = Marionette.CompositeView.extend({
	template: template,
    templateHelpers: function() {
        return {
            homeActive: this.options.section === 'Home',
            workActive: this.options.section === 'Work',
            wordsActive: this.options.section === 'Words',
            whoActive: this.options.section === 'Who'
        };
    }
});

module.exports = NavigationView;
