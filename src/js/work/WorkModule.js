var Marionette = require('backbone.marionette'),
	Backbone = require('backbone'),
	WorkController = require('./WorkController'),
    WorkRouter = require('./WorkRouter'),
	WorkModule;

WorkModule = Marionette.Module.extend({

	initialize: function() {
        this.controller = new WorkController({});
        this.router = new WorkRouter({ controller: this.controller });
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

module.exports = WorkModule;