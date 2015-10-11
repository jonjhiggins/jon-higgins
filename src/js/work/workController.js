var Marionette = require('backbone.marionette'),
    $ = require('jquery'),
    markdown = require('markdown').markdown,
	commands = require('../config/commands'),
	WorkController,
    WorkView = require('./workView'),
    WorkArticleItem = require('./WorkArticleItem'),
    WorkArticleItemView = require('./WorkArticleItemView'),
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

        $.each(data[0], function(index, item) {

            var html = /*markdown.toHTML(*/item.__content/*)*/,
                newItem = new WorkArticleItem({html: html});

            items.push(newItem);

        });

        this.view = new WorkArticleItemView({
            model: items[1]
        });

        commands.execute('app:screen:show', this.view);
    }
});

module.exports = WorkController;