/**
 * Created by marcinkrysiak on 25/02/15.
 */

/*globals Power2*/

var TweenMax = require('gsap/src/uncompressed/TweenMax.js'),
    Marionette = require('backbone.marionette'),
    _ = require('underscore');

var ShowAnimated = function() {

    _.extend(Marionette.Region.prototype, {

        animationType: 'default',

        attachHtml: function(view) {

            var self = this,
                oldView = this.currentView,
                newView = view;

            if (!oldView || !oldView.$el) this.animationType = 'default';

            switch (this.animationType) {

                case 'slideLeft':
                    TweenMax.to(oldView.$el, 0.5, {
                        x: '-100%',
                        ease: Power2.easeInOut,
                        onComplete: function() {

                            //empty old view
                            self.el.innerHTML = ''; //from the original attachHtml method

                            //reset the old view position
                            TweenMax.set(oldView.$el, {
                                x: '0%'
                            });

                            //prepare the new view
                            TweenMax.set(newView.$el, {
                                x: '100%'
                            });

                            //show the new view

                            self.el.appendChild(newView.el); //from the original attachHtml method

                            //animate in the new view
                            TweenMax.to(newView.$el, 0.5, {
                                x: '0%',
                                ease: Power2.easeInOut
                            });
                        }
                    });
                    break;

                default:
                    this.el.innerHTML = '';
                    this.el.appendChild(view.el);
            }

            this.animationType = 'default';
        },

        showAnimated: function(view, options) {

            options = options || {};
            this.animationType = options.animationType || 'default';
            //options.preventDestroy = true;

            var oldView = this.currentView;

            this.show(view, _.extend(options, {
                preventDestroy: true
            }));

            //destroy oldView if not preventDestroy = true
            if (!options.preventDestroy) {
                oldView.destroy();
            }

        }
    });

};

module.exports = ShowAnimated;
