var Backbone = require('backbone'),
    WorkArticleItem;

WorkArticleItem = Backbone.Model.extend({
    initialize: function() {

        // Generate URL from key
        var key = this.get('key'),
            file = key.substring(11, key.length); // trim off date

        this.set('url', '/work/' + file);
    }
});

module.exports = WorkArticleItem;
