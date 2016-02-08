'use strict';

// Requires

	var Marionette = require('backbone.marionette'),
		Backbone = require('backbone'),
		app = require('./app'),
		commands = require('./config/commands'),
		siteData = require('../data/site.json'),
		HomeModule = require('./Home/HomeModule'),
		ArticlesModule = require('./articles/ArticlesModule'),
		WhoModule = require('./Who/WhoModule'),
		NavigationModule = require('./Navigation/NavigationModule'),
		ShowAnimated = require('../js/plugins/backbone.marionette.showAnimated'),
		$ = require('jQuery');

// Modules

	app.module('navigation', NavigationModule);
	app.module('home', HomeModule);
	app.module('articles', ArticlesModule);
	app.module('who', WhoModule);


	/*globals console*/

	var showAnimated = new ShowAnimated();

// Command handlers

	commands.setHandler('app:screen:hide', function() {
		app.mainRegion.hideAnimated();
	});

	commands.setHandler('app:screen:show', function(view) {

	    //app.mainRegion.show(view);
		app.mainRegion.showAnimated(view, {animationType: 'slideLeft'});
	});

	commands.setHandler('app:navigation:show', function(view) {
	    app.navigationRegion.show(view);
	});

	commands.setHandler('app:navigation:update', function(section) {
		 app.navigation.updateNavigation(section);
	});

	// Set <title> tag
	commands.setHandler('app:title', function(title) {
		var formattedTitle = title !== 'Home' ? ' | ' + title : '';
	    document.title = siteData.siteName + formattedTitle;
	});


// Start App

	app.start();
	// Turn on HTML5 pushState / turn off hashbang
	Backbone.history.start({ pushState: true });

	// Use absolute URLs  to navigate to anything not in your Router.

var openLinkInTab = false;

// Only need this for pushState enabled browsers
if (Backbone.history && Backbone.history._hasPushState) {

  $(document).on('keydown', function(event) {
    if (event.ctrlKey || event.keyCode === 91) {
      openLinkInTab = true;
    }
  });

  $(document).on('keyup', function(event) {
      openLinkInTab = false;
  });

  // Use delegation to avoid initial DOM selection and allow all matching elements to bubble
  $(document).on('click', 'a', function(evt) {
    // Get the anchor href and protcol
    var href = $(this).attr('href'),
		protocol = this.protocol + '//';

    // Ensure the protocol is not part of URL, meaning its relative.
    // Stop the event bubbling to ensure the link will not cause a page refresh.
    if (!openLinkInTab && href.slice(0, protocol.length) !== protocol) {
      evt.preventDefault();

      // Note by using Backbone.history.navigate, router events will not be
      // triggered.  If this is a problem, change this to navigate on your
      // router.
      Backbone.history.navigate(href, true);
    }
  });

}
