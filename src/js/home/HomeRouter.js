'use strict';

var Marionette = require('backbone.marionette'),
    HomeRouter;

HomeRouter = Marionette.AppRouter.extend({
    appRoutes: {
        '': 'showHome',
        '/': 'showHome',
    }
});

module.exports = HomeRouter;