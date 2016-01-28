var Marionette = require('backbone.marionette'),
    templateSingle = require('./ArticleItemTemplate.hbs'),
    templateCollection = require('./ArticleCollectionItemTemplate.hbs'),
    HandlebarsCompiler = require('hbsfy/runtime'),
    ArticleItemView;

// Register handlebars markdown helper
HandlebarsCompiler.registerHelper('md', require('helper-md'));

ArticleItemView = Marionette.ItemView.extend({
    // Different template when in a collection
    getTemplate: function() {
        return this.model.collection ? templateCollection : templateSingle;
    },
    tagName: 'article',
    className: 'article-item',
    templateHelpers: function() {
        return {
            date: function() {
                var date = new Date(this.model.get('item').date),
                    dateFormatted = date.toLocaleString('en-gb', {
                        month: "short"
                    }) + ' ' + date.getFullYear();

                return dateFormatted;
            }.bind(this)
        };
    }
});

module.exports = ArticleItemView;
