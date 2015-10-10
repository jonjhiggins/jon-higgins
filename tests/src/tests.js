/*globals app:true, describe:true, xit:true, it:true, chai: true*/

var chai = require('chai'),
	app = require('../../src/js/app'),
	HomeModule = require('../../src/js/Home/HomeModule'),
	WorkModule = require('../../src/js/Work/WorkModule'),
	WhoModule = require('../../src/js/Who/WhoModule');

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

	describe('Work', function(){

		var workModule = app.module('work', WorkModule);

		it('should be defined', function(){
		  chai.assert(workModule === app.work);
		});
	});

	describe('Who', function(){

		var whoModule = app.module('who', WhoModule);

		it('should be defined', function(){
		  chai.assert(whoModule === app.who);
		});
	});


});