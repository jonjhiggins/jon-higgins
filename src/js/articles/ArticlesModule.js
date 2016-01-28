var Marionette = require('backbone.marionette'),
	Backbone = require('backbone'),
	ArticlesController = require('./ArticlesController'),
    ArticlesRouter = require('./ArticlesRouter'),
	ArticlesModule;

ArticlesModule = Marionette.Module.extend({

	initialize: function() {
        this.controller = new ArticlesController({});
        this.router = new ArticlesRouter({ controller: this.controller });
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

module.exports = ArticlesModule;
