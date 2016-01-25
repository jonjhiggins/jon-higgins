var Marionette = require('backbone.marionette'),
    $ = require('jquery'),
    markdown = require('markdown').markdown,
    commands = require('../config/commands'),
    WorkController,
    WorkArticleItem = require('./WorkArticleItem'),
    WorkArticleItemView = require('./WorkArticleItemView'),
    WorkArticleCollection = require('./WorkArticleCollection'),
    WorkArticleCollectionView = require('./WorkArticleCollectionView'),
    moduleName = 'Work';

WorkController = Marionette.Controller.extend({
    initialize: function() {

    },
    showWork: function() {
        commands.execute('app:navigation:update', moduleName);
        commands.execute('app:title', moduleName);

        var renderWork = this.renderWork.bind(this);

        this.loadWork(renderWork);
    },
    showWorkItem: function(id) {
        commands.execute('app:navigation:update', moduleName);
        commands.execute('app:title', moduleName);

        var renderWorkItem = this.renderWorkItem.bind(this, id);

        this.loadWork(renderWorkItem);
    },
    loadWork: function(callback) {
        $.ajax('/assets/data/work.json').done(callback);
    },
    renderWork: function(data) {

        var items = [];

        $.each(data[0], function(key, item) {
            var newItem = new WorkArticleItem({
                key: key,
                item: item
            });
            items.push(newItem);
        });

        // Date order
        items.sort(function(x, y) {
            return new Date(y.get('item').date) - new Date(x.get('item').date);
        });

        var collection = new WorkArticleCollection(items);

        this.view = new WorkArticleCollectionView({
            collection: collection
        });

        commands.execute('app:screen:show', this.view);
    },
    renderWorkItem: function(id, data) {

        var model = new WorkArticleItem({
            item: data[0][id]
        });

        this.view = new WorkArticleItemView({
            key: null,
            model: model
        });

        commands.execute('app:screen:show', this.view);
    }
});

module.exports = WorkController;
