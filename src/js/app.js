'use strict';

var Marionette = require('backbone.marionette');

var app = new Marionette.Application({
	regions: {
		'headerRegion': '#header',
		'mainRegion': '#main',
		'footerRegion': '#footer'
	}
});

module.exports = app;