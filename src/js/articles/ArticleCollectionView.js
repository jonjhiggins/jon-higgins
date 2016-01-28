var Marionette = require('backbone.marionette'),
    ArticleItemView = require('./ArticleItemView'),
    ArticleCollectionView;

ArticleCollectionView = Marionette.CollectionView.extend({
    className: 'article-list',
    childView: ArticleItemView
});

module.exports = ArticleCollectionView;
