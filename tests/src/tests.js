/*globals app:true, describe:true, xit:true, it:true, chai: true*/

var chai = require('chai'),
	app = require('../../src/js/app'),
	HomeModule = require('../../src/js/Home/HomeModule'),
	ArticlesModule = require('../../src/js/articles/ArticlesModule'),
	WhoModule = require('../../src/js/Who/WhoModule'),
	NavigationModule = require('../../src/js/Navigation/NavigationModule');

describe('App', function(){
	it('should be defined', function(){
	  chai.assert.isDefined(app);
	});
});


describe('Module', function(){

	describe('Home', function(){

		var homeModule = app.module('home', HomeModule);

		it('should be defined', function(){
		  chai.assert(homeModule === app.home);
		});
	});

	describe('Articles', function(){

		var articlesModule = app.module('articles', ArticlesModule);

		it('should be defined', function(){
		  chai.assert(articlesModule === app.articles);
		});
	});

	describe('Who', function(){

		var whoModule = app.module('who', WhoModule);

		it('should be defined', function(){
		  chai.assert(whoModule === app.who);
		});
	});

	describe('Navigation', function(){

		var navigationModule = app.module('navigation', NavigationModule);

		it('should be defined', function(){
		  chai.assert(navigationModule === app.navigation);
		});
	});


});
