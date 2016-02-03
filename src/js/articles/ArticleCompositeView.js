var Marionette = require('backbone.marionette'),
    ArticleItemView = require('./ArticleItemView'),
    ArticleCompositeViewTemplate = require('./ArticleCompositeViewTemplate.hbs'),
    ArticleCompositeView;

ArticleCompositeView = Marionette.CompositeView.extend({
    childViewContainer: '.article-list',
    template: ArticleCompositeViewTemplate,
    childView: ArticleItemView,
    templateHelpers: function() {
        return {
            archiveMode: function() {
                return this.options.archiveMode;
            }.bind(this),
            archiveAvailable: function() {
                return this.options.archiveAvailable;
            }.bind(this),
            templateType: function() {
                return this.options.templateType;
            }
        };
    }
});

module.exports = ArticleCompositeView;
