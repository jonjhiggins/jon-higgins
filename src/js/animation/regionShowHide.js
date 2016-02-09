
/*globals Power2*/

var TweenMax = require('gsap/src/uncompressed/TweenMax.js'),
    Marionette = require('backbone.marionette'),
    $ = require('jQuery'),
    _ = require('underscore');

var RegionHideShow = function() {

    _.extend(Marionette.Region.prototype, {

        hidingDeferredRequired: false,

        hidingDeferred: null,

        showAnimated: function(view, options) {

            // If hiding, defer until finished
            if (this.hidingDeferredRequired) {

                this.hidingDeferred.done(this.showAnimated.bind(this, view, options));
                this.hidingDeferredRequired = false;

                return;
            }

            options = options || {};

            var oldView = this.currentView;

            this.show(view, _.extend(options, {
                preventDestroy: true
            }));

            //destroy oldView if not preventDestroy = true
            if (!options.preventDestroy) {
                oldView.destroy();
            }

        },

        hideAnimated: function() {

            // Reset deferred
            this.hidingDeferred = $.Deferred();


            if (this.currentView) {

                this.hidingDeferredRequired = true;

                if (this.currentView.regionHide) {
                    // Custom hide specifed in view
                    this.currentView.regionHide(this.hidingDeferred);
                } else {
                    // Default hide
                    this.currentView.$el.fadeOut(400, this.resolveHidingDeferred.bind(this));
                }
            }
        },

        resolveHidingDeferred: function() {
            this.hidingDeferred.resolve();
        }
    });

};

module.exports = RegionHideShow;
