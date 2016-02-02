var Marionette = require('backbone.marionette'),
    $ = require('jquery'),
    markdown = require('markdown').markdown,
    commands = require('../config/commands'),
    ArticlesController,
    ArticleItem = require('./ArticleItem'),
    ArticleItemView = require('./ArticleItemView'),
    ArticleCollection = require('./ArticleCollection'),
    ArticleCompositeView = require('./ArticleCompositeView'),
    pageNames = {
        work: 'Work',
        words: 'Words'
    };

ArticlesController = Marionette.Controller.extend({
    initialize: function() {

    },
    showWork: function() {
        this.showArticles('work', false, true);
    },
    showWorkArchive: function() {
        this.showArticles('work', false, false);
    },
    showWords: function() {
        this.showArticles('words', false, null);
    },
    showWorkItem: function(id) {
        this.showArticles('work', true, null, id);
    },
    showWordsItem: function(id) {
        this.showArticles('words', true, null, id);
    },
    updateNavigation: function(moduleName) {
        commands.execute('app:navigation:update', moduleName);
        commands.execute('app:title', moduleName);
    },
    showArticles: function(type, singleArticleItem, filterArchived, id) {

        var renderArticle;

        this.updateNavigation(pageNames[type]);
        commands.execute('app:screen:hide');

        if (singleArticleItem) {
            // Just showing one article
            renderArticle = this.renderArticleItem.bind(this, id);
        } else {
            // List all articles
            renderArticle = this.renderArticles.bind(this, type, filterArchived);
        }

        this.loadArticle(type, renderArticle);
    },
    loadArticle: function(type, callback) {
        $.ajax('/assets/data/' + type + '.json')
            .done(callback)
            .fail(this.failedAjax);
    },
    renderArticles: function(type, filterArchived, data) {

        var items = [];
/*globals console*/
        $.each(data[0], function(key, item) {

            // Filter in/out archived items if required
            if (filterArchived !== null && ((filterArchived && item.archive) || (!filterArchived && !item.archive))) {
                return;
            }

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

        this.view = new ArticleCompositeView({
            archiveMode: filterArchived === false,
            archiveAvailable: filterArchived,
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
    },
    failedAjax: function() {
        // @TODO make error view
        window.alert('Sorry, there was a connection error');
    }
});

module.exports = ArticlesController;
