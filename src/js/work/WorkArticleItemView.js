var Marionette = require('backbone.marionette'),
    template = require('./WorkArticleItemTemplate.hbs'),
    WorkArticleItemView;

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
