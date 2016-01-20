var Marionette = require('backbone.marionette'),
    templateSingle = require('./WorkArticleItemTemplate.hbs'),
    templateCollection = require('./WorkArticleCollectionItemTemplate.hbs'),
    HandlebarsCompiler = require('hbsfy/runtime'),
    WorkArticleItemView;

// Register handlebars markdown helper
HandlebarsCompiler.registerHelper('md', require('helper-md'));

WorkArticleItemView = Marionette.ItemView.extend({
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

module.exports = WorkArticleItemView;
