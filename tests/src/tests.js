/*globals app:true, describe:true, xit:true, it:true, chai: true*/

var chai = require('chai'),
	app = require('../../src/js/app'),
	HomeModule = require('../../src/js/Home/HomeModule');

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

});