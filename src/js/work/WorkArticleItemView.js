var Marionette = require('backbone.marionette'),
    template = require('./WorkArticleItemTemplate.hbs'),
    HandlebarsCompiler = require('hbsfy/runtime'),
    WorkArticleItemView;

// Register handlebars markdown helper
HandlebarsCompiler.registerHelper('md', require('helper-md'));

WorkArticleItemView = Marionette.ItemView.extend({
    template: template,
    tagName: 'article',
    className: 'article-item'/*,
    templateHelpers: function () {
        return {
            active: this.options.section === this.model.get('title')
        };
    }*/
});

module.exports = WorkArticleItemView;
