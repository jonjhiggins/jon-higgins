var Marionette = require('backbone.marionette'),
    $ = require('jquery'),
    markdown = require('markdown').markdown,
	commands = require('../config/commands'),
	WorkController,
    WorkView = require('./workView'),
    WorkArticleItem = require('./WorkArticleItem'),
    WorkArticleItemView = require('./WorkArticleItemView'),
    WorkArticleCollection = require('./WorkArticleCollection'),
    WorkArticleCollectionView = require('./WorkArticleCollectionView'),
    moduleName = 'Work';

WorkController = Marionette.Controller.extend({
	initialize: function() {

    },
    showWork: function() {
    	this.view = new WorkView();

        commands.execute('app:screen:show', this.view);
        commands.execute('app:navigation:update', moduleName);
        commands.execute('app:title', moduleName);

        this.loadWork();
    },
    loadWork: function () {
        $.ajax('/assets/data/work.json').done(this.renderWork.bind(this));
    },
    renderWork: function (data) {
        /*globals console*/

        var items = [];

        $.each(data[0], function(key, item) {
            var newItem = new WorkArticleItem({
                key: key,
                item: item
            });
            items.push(newItem);
        });

        var collection = new WorkArticleCollection(items);

        this.view = new WorkArticleCollectionView({
            collection: collection
        });

        commands.execute('app:screen:show', this.view);
    }
});

module.exports = WorkController;
