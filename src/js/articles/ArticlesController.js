var Marionette = require('backbone.marionette'),
    $ = require('jquery'),
    markdown = require('markdown').markdown,
    commands = require('../config/commands'),
    ArticlesController,
    ArticleItem = require('./ArticleItem'),
    ArticleItemView = require('./ArticleItemView'),
    ArticleCollection = require('./ArticleCollection'),
    ArticleCollectionView = require('./ArticleCollectionView'),
    pageNames = {
        work: 'Work',
        words: 'Words'
    };

ArticlesController = Marionette.Controller.extend({
    initialize: function() {

    },
    showWork: function() {
        this.showArticles('work', false);
    },
    showWords: function() {
        this.showArticles('words', false);
    },
    showWorkItem: function(id) {
        this.showArticles('work', true, id);
    },
    showWordsItem: function(id) {
        this.showArticles('words', true, id);
    },
    updateNavigation: function(moduleName) {
        commands.execute('app:navigation:update', moduleName);
        commands.execute('app:title', moduleName);
    },
    showArticles: function(type, singleArticleItem, id) {

        var renderArticle;

        this.updateNavigation(pageNames[type]);
        commands.execute('app:screen:hide');

        if (singleArticleItem) {
            // Just showing one article
            renderArticle = this.renderArticleItem.bind(this, id);
        } else {
            // List all articles
            renderArticle = this.renderArticle.bind(this, type);
        }

        this.loadArticle(type, renderArticle);
    },
    loadArticle: function(type, callback) {
        $.ajax('/assets/data/' + type + '.json')
            .done(callback)
            .fail(this.failedAjax);
    },
    renderArticle: function(type, data) {

        var items = [];

        $.each(data[0], function(key, item) {
            var newItem = new ArticleItem({
                key: key,
                item: item,
                type: type
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
/*globals console*/console.log(id, data);
        var model = new ArticleItem({
            item: data[0][id]
        });

        this.view = new ArticleItemView({
            key: null,
            model: model
        });

        commands.execute('app:screen:show', this.view);
    },
    failedAjax: function() {
        // @TODO make error view
        window.alert('Sorry, there was a connection error');
    }
});

module.exports = ArticlesController;
