var Marionette = require('backbone.marionette'),
    WorkArticleItemView = require('./WorkArticleItemView'),
    WorkArticleCollectionView;

WorkArticleCollectionView = Marionette.CollectionView.extend({
    className: 'article-list',
    childView: WorkArticleItemView
});

module.exports = WorkArticleCollectionView;
