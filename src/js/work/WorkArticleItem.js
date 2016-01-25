var Backbone = require('backbone'),
    WorkArticleItem;

WorkArticleItem = Backbone.Model.extend({
    initialize: function() {

        var key = this.get('key');


        if (key) {
            var url = this.generateUrl(key);
            this.set('url', url);
        }

    },
    // Generate URL from key
    generateUrl: function(key) {
        return '/work/' + key;
    }
});

module.exports = WorkArticleItem;
