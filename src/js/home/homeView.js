var Marionette = require('backbone.marionette'),
	template = require('./HomeTemplate.hbs'),
	TweenMax = require('gsap/src/uncompressed/TweenMax.js'),
	$ = require('jQuery'),
	HomeView;

HomeView = Marionette.CompositeView.extend({
	$shapes: null,
	template: template,
	rotateShapes: function(sideNo, delay) {

		var setShape3d = function($shape) {
			$shape.addClass('shape--3d');
		};

		var unsetShape3d = function($shape) {
			$shape.removeClass('shape--3d');
		};

		var updateShapeClasses = function($shape, sideNo) {
			var sideClasses = [
				'shape--show-1',
				'shape--show-2',
				'shape--show-3',
				'shape--show-4',
				'shape--show-5',
				'shape--show-6',
			];

			$shape
				.removeClass(sideClasses.join(' '))
				.addClass('shape--show-' + sideNo);
		};

		var showSide = function($shape, sideNo) {
			// Move forward
			setShape3d($shape);
			// Show side
			window.setTimeout(updateShapeClasses.bind(null, $shape, sideNo), 100);
			// Move backward
			window.setTimeout(unsetShape3d.bind(null, $shape), 500);
		};

		// There are only 4 sides to each shape.
		// When sideNo is over 4, replace the 1st side, 2nd side again etc.
		var shapeTextIndex = sideNo - 1,
			actualSideNo = shapeTextIndex % 4;

		// Shape sides: set the text content
		window.setTimeout(this.shapeItemSetContent.bind(this, shapeTextIndex, actualSideNo), delay);

		// @TODO move to each?
		var $shape1 = this.$shapes.eq(0),
			$shape2 = this.$shapes.eq(1),
			$shape3 = this.$shapes.eq(2);

		window.setTimeout(showSide.bind(null, $shape1, sideNo), delay + 2400);
		window.setTimeout(showSide.bind(null, $shape2, sideNo), delay + 2800);
		window.setTimeout(showSide.bind(null, $shape3, sideNo), delay + 3200);
	},
	onShow: function() {
		// Set selectors
		this.$shapes = this.$el.find('.animation__block .shape');
		// Set content
		this.shapeSetContent();
		// Animate
		this.shapeAnimation();
	},
	shapeAnimation: function() {

		var rotateDelay = 2400;

		// Show side 2
		this.rotateShapes(1, rotateDelay * 0);

		// Show side 2
		this.rotateShapes(2, rotateDelay * 1);

		//  Show side 3
		this.rotateShapes(3, rotateDelay * 2);

		//  Show side 4
		this.rotateShapes(4, rotateDelay * 3);

		//  Show side 5
		this.rotateShapes(5, rotateDelay * 4);

		//  Show side 6
		this.rotateShapes(6, rotateDelay * 5);

		this.rotateShapes(1, rotateDelay * 7);

	},
	// iterate through the 3 shapes, call shapeTextSetContent on each text element
	shapeItemSetContent: function(shapeTextIndex, actualSideNo) {
		this.$shapes.each(this.shapeTextSetContent.bind(this, shapeTextIndex, actualSideNo));
	},
	shapeSetContent: function () {
		this.content = [
			['Hi', 'I&rsquo;m', 'Jon Higgins,'],
			['a', 'front-end', 'developer'],
			['who', 'loves', 'learning'],
			['and', 'enjoys', 'experimenting.'],
			['Is', 'partial to', 'collaboration'],
			['and', 'first-rate', 'production.']
		];
	},
	// Set the content of the text element itself
	shapeTextSetContent: function(shapeTextIndex, actualSideNo, shapeIndex, shape) {
		var $shapeText = $(shape).find('.shape__text').eq(actualSideNo);
		$shapeText.html(this.content[shapeTextIndex][shapeIndex]);
	}
});

module.exports = HomeView;
