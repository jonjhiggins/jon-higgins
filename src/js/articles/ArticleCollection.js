var Backbone = require('backbone'),
    ArticleItem = require('./ArticleItem'),
    ArticleCollection;

ArticleCollection = Backbone.Collection.extend({
    model: ArticleItem
});

module.exports = ArticleCollection;
