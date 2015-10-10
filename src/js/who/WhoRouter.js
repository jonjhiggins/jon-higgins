'use strict';

var Marionette = require('backbone.marionette'),
    WhoRouter;

WhoRouter = Marionette.AppRouter.extend({
    appRoutes: {
        'who': 'showWho',
    }
});

module.exports = WhoRouter;