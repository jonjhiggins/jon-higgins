var Backbone = require('backbone'),
    WorkArticleItem = require('./WorkArticleItem'),
    WorkArticleCollection;

WorkArticleCollection = Backbone.Collection.extend({
    model: WorkArticleItem
});

module.exports = WorkArticleCollection;
