var Backbone = require('backbone'),
    ArticleItem;

ArticleItem = Backbone.Model.extend({
    initialize: function() {

        var key = this.get('key'),
            type = this.get('type');


        if (key && type) {
            var url = this.generateUrl(type, key);
            this.set('url', url);
        }

    },
    // Generate URL from key
    generateUrl: function(type, key) {
        return '/' + type + '/' + key;
    }
});

module.exports = ArticleItem;
