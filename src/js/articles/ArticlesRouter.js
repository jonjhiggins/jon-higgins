'use strict';

var Marionette = require('backbone.marionette'),
    ArticlesRouter;

ArticlesRouter = Marionette.AppRouter.extend({
    appRoutes: {
        'work': 'showArticle',
        'work/': 'showArticle',
        'work/:id': 'showArticleItem'
    }
});

module.exports = ArticlesRouter;
