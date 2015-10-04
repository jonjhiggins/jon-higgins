var Marionette = require('backbone.marionette'),
	Backbone = require('backbone'),
	HomeController = require('./HomeController'),
    HomeRouter = require('./HomeRouter'),
	HomeModule;

HomeModule = Marionette.Module.extend({

	initialize: function() {
        this.controller = new HomeController({});
        this.router = new HomeRouter({ controller: this.controller });
        this.listenTo(Backbone.history, 'route', this._onRoute);
    },

    _onRoute: function(router) {
        if (this.router === router) {
            if (!this._started) this.start();
        } else {
            if (this._started) this.stop();
        }
    }
});

module.exports = HomeModule;