var Backbone = require('backbone'),
    NavigationItem = require('./NavigationItem'),
    NavigationItems;

var NavigationItems = Backbone.Collection.extend({
    model: NavigationItem
});

module.exports = NavigationItems;