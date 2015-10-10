var Marionette = require('backbone.marionette'),
	Backbone = require('backbone'),
	WhoController = require('./WhoController'),
    WhoRouter = require('./WhoRouter'),
	WhoModule;

WhoModule = Marionette.Module.extend({

	initialize: function() {
        this.controller = new WhoController({});
        this.router = new WhoRouter({ controller: this.controller });
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

module.exports = WhoModule;