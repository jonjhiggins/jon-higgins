'use strict';

var Marionette = require('backbone.marionette');

var app = new Marionette.Application({
	regions: {
		'navigationRegion': '#navigation',
		'mainRegion': '#main',
		'footerRegion': '#footer'
	}
});

module.exports = app;
