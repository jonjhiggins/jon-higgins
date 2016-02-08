var Marionette = require('backbone.marionette'),
    ArticleItemView = require('./ArticleItemView'),
    ArticleCompositeViewTemplate = require('./ArticleCompositeViewTemplate.hbs'),
    ArticleCompositeView;

ArticleCompositeView = Marionette.CompositeView.extend({
    childViewContainer: '.article-list',
    template: ArticleCompositeViewTemplate,
    childView: ArticleItemView,
    regionHide: function(deferred) {
        this.$el.fadeOut(400, this.deferredResolve.bind(null, deferred));
    },
    deferredResolve: function(deferred) {
        deferred.resolve();
    },
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
