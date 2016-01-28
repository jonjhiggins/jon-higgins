'use strict';

var Marionette = require('backbone.marionette'),
    WorkRouter;

WorkRouter = Marionette.AppRouter.extend({
    appRoutes: {
        'work': 'showWork',
        'work/': 'showWork',
        'work/:id': 'showWorkItem'
    }
});

module.exports = WorkRouter;
