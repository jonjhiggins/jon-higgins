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

		it('should list work on show', function(){
		  chai.assert.isDefined(jhApp.homeController.show());
		});
	});

});