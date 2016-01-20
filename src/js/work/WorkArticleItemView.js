var Marionette = require('backbone.marionette'),
    template = require('./WorkArticleItemTemplate.hbs'),
    HandlebarsCompiler = require('hbsfy/runtime'),
    WorkArticleItemView;

// Register handlebars markdown helper
HandlebarsCompiler.registerHelper('md', require('helper-md'));

WorkArticleItemView = Marionette.ItemView.extend({
    template: template,
    tagName: 'article',
    className: 'article-item',
    templateHelpers: function () {
        return {
            date: function() {
                var date = new Date(this.model.get('item').date),
                    dateFormatted = date.toLocaleString('en-gb', { month: "short" }) + ' ' + date.getFullYear();

                return dateFormatted;
            }.bind(this)
        };
    }
});

module.exports = WorkArticleItemView;
