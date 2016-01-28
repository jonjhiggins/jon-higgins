var Marionette = require('backbone.marionette'),
    $ = require('jquery'),
    markdown = require('markdown').markdown,
    commands = require('../config/commands'),
    ArticlesController,
    ArticleItem = require('./ArticleItem'),
    ArticleItemView = require('./ArticleItemView'),
    ArticleCollection = require('./ArticleCollection'),
    ArticleCollectionView = require('./ArticleCollectionView'),
    moduleName = 'Articles';

ArticlesController = Marionette.Controller.extend({
    initialize: function() {

    },
    showArticle: function() {
        commands.execute('app:navigation:update', moduleName);
        commands.execute('app:title', moduleName);

        var renderArticle = this.renderArticle.bind(this);
        commands.execute('app:screen:hide', moduleName);
        this.loadArticle(renderArticle);
    },
    showArticleItem: function(id) {
        commands.execute('app:navigation:update', moduleName);
        commands.execute('app:title', moduleName);

        var renderArticleItem = this.renderArticleItem.bind(this, id);
        commands.execute('app:screen:hide', moduleName);
        this.loadArticle(renderArticleItem);
    },
    loadArticle: function(callback) {
        $.ajax('/assets/data/work.json').done(callback);
    },
    renderArticle: function(data) {

        var items = [];

        $.each(data[0], function(key, item) {
            var newItem = new ArticleItem({
                key: key,
                item: item
            });
            items.push(newItem);
        });

        // Date order
        items.sort(function(x, y) {
            return new Date(y.get('item').date) - new Date(x.get('item').date);
        });

        var collection = new ArticleCollection(items);

        this.view = new ArticleCollectionView({
            collection: collection
        });

        commands.execute('app:screen:show', this.view);
    },
    renderArticleItem: function(id, data) {

        var model = new ArticleItem({
            item: data[0][id]
        });

        this.view = new ArticleItemView({
            key: null,
            model: model
        });

        commands.execute('app:screen:show', this.view);
    }
});

module.exports = ArticlesController;
