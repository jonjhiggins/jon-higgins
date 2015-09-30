describe('App', function(){
	it('should be defined', function(){
	  chai.assert.isDefined(jhApp);
	});
});


describe('Controller', function(){

	describe('Home', function(){
		it('should be defined', function(){
		  chai.assert.isDefined(jhApp.homeController);
		});

		it('should show', function(){
		  chai.assert.isDefined(jhApp.homeController.show());
		});
	});

	describe('Work', function(){
		it('should be defined', function(){
		  chai.assert.isDefined(jhApp.workController);
		});

		it('should show', function(){
		  chai.assert.isDefined(jhApp.workController.show());
		});
	});

});