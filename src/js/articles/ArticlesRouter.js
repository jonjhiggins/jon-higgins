'use strict';

var Marionette = require('backbone.marionette'),
    ArticlesRouter;

ArticlesRouter = Marionette.AppRouter.extend({
    appRoutes: {
        'work': 'showWork',
        'work/': 'showWork',
        'work/archive': 'showWorkArchive',
        'work/:id': 'showWorkItem',
        'words': 'showWords',
        'words/': 'showWords',
        'words/:id': 'showWordsItem'
    }
});

module.exports = ArticlesRouter;
