var Marionette = require('backbone.marionette'),
    templateSingle = require('./ArticleItemTemplate.hbs'),
    templateCollection = require('./ArticleCollectionItemTemplate.hbs'),
    HandlebarsCompiler = require('hbsfy/runtime'),
    moment = require('moment'),
    ArticleItemView;

// Register handlebars markdown helper
HandlebarsCompiler.registerHelper('md', require('helper-md'));

ArticleItemView = Marionette.ItemView.extend({
    // Different template when in a collection
    getTemplate: function() {
        return this.model.collection ? templateCollection : templateSingle;
    },
    tagName: 'article',
    className: function() {
        return 'article-item article-item--' + this.model.get('item').class;
    },
    templateHelpers: function() {
        return {

            date: function() {
                return moment(this.model.get('item').date, 'YYYYMMDD').format('MMM YYYY');
            }.bind(this),

            responsiveImages: function() {
                var responsiveImages = this.model.get('item').images.length > 1;
                return responsiveImages;
            }.bind(this)
        };
    }
});

module.exports = ArticleItemView;
