/*globals app:true, describe:true, xit:true, it:true, chai: true*/

describe('App', function(){
	xit('should be defined', function(){
	  chai.assert.isDefined(app);
	});
});


describe('Controller', function(){

	describe('Home', function(){
		xit('should be defined', function(){
		  chai.assert.isDefined(app.homeController);
		});

		xit('should show', function(){
		  chai.assert.isDefined(app.homeController.show());
		});
	});

	describe('Work', function(){
		xit('should be defined', function(){
		  chai.assert.isDefined(app.workController);
		});

		xit('should show', function(){
		  chai.assert.isDefined(app.workController.show());
		});
	});

});