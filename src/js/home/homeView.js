var Marionette = require('backbone.marionette'),
	template = require('./HomeTemplate.hbs'),
	TweenMax = require('gsap/src/uncompressed/TweenMax.js'),
	$ = require('jQuery'),
	HomeView;

var animationContent = [
	['', '', ''],
	['Hi', 'I&rsquo;m', 'Jon Higgins,'],
	['a', 'front-end', 'developer'],
	['who', 'loves', 'learning'],
	['and', 'enjoys', 'experimenting.'],
	['Is', 'partial to', 'collaboration'],
	['and', 'first-rate', 'production.']
];

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
				'shape--show-7',
			];

			$shape
				.removeClass(sideClasses.join(' '))
				.addClass('shape--show-' + sideNo);
		};

		var showSide = function($shape, sideNo) {
			// Move forward, except first time
			if (sideNo !== 1) {
				setShape3d($shape);
				// Show side
				window.setTimeout(updateShapeClasses.bind(null, $shape, sideNo), 100);
				// Move backward
				window.setTimeout(unsetShape3d.bind(null, $shape), 500);
			} else {
				updateShapeClasses($shape, sideNo);
			}


		};

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
		// Animate
		this.shapeAnimation();
	},
	setContentRotateShapes: function(sideNo, delay) {
		this.setShapeContent(sideNo, delay);
		this.rotateShapes(sideNo, delay);
	},
	setShapeContent: function (sideNo, delay) {
		// There are only 4 sides to each shape.
		// When sideNo is over 4, replace the 1st side, 2nd side again etc.
		var shapeTextIndex = sideNo - 1,
			actualSideNo = shapeTextIndex % 4;

		// Shape sides: set the text content
		window.setTimeout(this.shapeItemSetContent.bind(this, shapeTextIndex, actualSideNo), delay + 2300);
	},
	shapeAnimation: function() {

		var rotateDelay = 2400,
			sidesTotal = 6,
			sidesStartIndex = 2,
			i;

		var startTimeline = function() {
			for (i = 0; i < sidesTotal; i++) {
				this.setContentRotateShapes(sidesStartIndex + i, rotateDelay * i);
			}
		};

		startTimeline.call(this);
		window.setInterval(startTimeline.bind(this), rotateDelay * (sidesTotal + 1));

	},
	// iterate through the 3 shapes, call shapeTextSetContent on each text element
	shapeItemSetContent: function(shapeTextIndex, actualSideNo) {
		this.$shapes.each(this.shapeTextSetContent.bind(this, shapeTextIndex, actualSideNo));
	},
	// Set the content of the text element itself
	shapeTextSetContent: function(shapeTextIndex, actualSideNo, shapeIndex, shape) {
		var $shapeText = $(shape).find('.shape__text').eq(actualSideNo);
		$shapeText.html(animationContent[shapeTextIndex][shapeIndex]);
	}
});

module.exports = HomeView;
