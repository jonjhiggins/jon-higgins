'use strict';

var Marionette = require('backbone.marionette'),
    WorkRouter;

WorkRouter = Marionette.AppRouter.extend({
    appRoutes: {
        'work': 'showWork',
    }
});

module.exports = WorkRouter;