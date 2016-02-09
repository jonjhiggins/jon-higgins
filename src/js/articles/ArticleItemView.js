/*globals Bounce, Back, Elastic, Power2*/

var Marionette = require('backbone.marionette'),
    templateSingle = require('./ArticleTemplate.hbs'),
    templateCollection = require('./ArticleItemTemplate.hbs'),
    HandlebarsCompiler = require('hbsfy/runtime'),
    moment = require('moment'),
    TweenMax = require('gsap/src/uncompressed/TweenMax.js'),
    $ = require('jQuery'),
    imagesLoaded = require('imagesloaded'),
    ArticleItemView;

// Register handlebars markdown helper
HandlebarsCompiler.registerHelper('md', require('helper-md'));
// Setup imagesLoaded plugin
imagesLoaded.makeJQueryPlugin($);

var props = {
    headerFooterColor: '255, 242, 0'
};

ArticleItemView = Marionette.ItemView.extend({

    cache: {}, // set in refreshSelectors

    // Different template when in a collection
    getTemplate: function() {
        return this.model.collection ? templateCollection : templateSingle;
    },
    tagName: 'article',
    className: function() {
        if (this.model.collection) {
            return 'article-item article-item--' + this.model.get('item').class;
        } else {
            return 'article article--' + this.model.get('item').class;
        }

    },

    buildOutline: function(width, height, top, left, borderColor, alternate) {

        var $outline = $('<div class="outline"><span></span><span></span><span></span><span></span></div>');


        $outline.css({
            width: width,
            height: height,
            top: top,
            left: left,
            color: borderColor
        });

        if (alternate) {
            $outline.css('transform', 'rotate(180deg)');
        }

        $outline.find('span').each(function(index, item) {
            var $item = $(item);

            if (index === 0) {
                TweenMax.fromTo($item, 0.4, {scaleY: 0, transformOrigin: '50% 100%'}, {scaleY: 1, delay: 0.4});
            } else if (index === 1) {
                TweenMax.fromTo($item, 0.4, {scaleX: 0, transformOrigin: '0% 50%'}, {scaleX: 1, delay: 0.8});
            } else if (index === 2) {
                TweenMax.fromTo($item, 0.4, {scaleY: 0, transformOrigin: '50% 0%'}, {scaleY: 1, delay: 1.2});
            } else if (index === 3) {
                TweenMax.fromTo($item, 0.4, {scaleX: 0, transformOrigin: '100% 50%'}, {scaleX: 1, delay: 1.6});
            }

        });

        return $outline;
    },

    onBeforeShow: function() {
        this.refreshSelectors();
    },

    onShow: function() {

        props.headerFooterColor = this.cache.$headerFooter.css('background-color').replace(/[rgb\(\)']+/g, '');

        // Set header / footer initial styles
        TweenMax.set(this.cache.$headerFooterContents, {opacity: '0'});
        TweenMax.set(this.cache.$headerFooter, {backgroundColor: 'rgba(' + props.headerFooterColor + ',0)'});

        // Set image initial styles
        if (this.cache.$image.length) {
            TweenMax.set(this.cache.$imageContents, {opacity: '0'});
        }

        //Check if image loaded
        this.cache.$image.imagesLoaded()
            .done(this.setupOutlines.bind(this));

            // @TODO fail etc

    },
    refreshSelectors: function() {
        this.cache = {
            $header: this.$el.find('.article-item__header'),
            $footer: this.$el.find('.article-item__footer'),
            $headerFooter: this.$el.find('.article-item__header, .article-item__footer'),
            $headerFooterContents: this.$el.find('.article-item__header > *, .article-item__footer > *'),
            $image: $(this.el).find('.article-item__image'), // Have to refresh this.el  selector for imagesLoaded
            $imageContents: this.$el.find('.article-item__image img')
        };
    },
    setupOutlines: function() {

        // Create outline
        var headerPosition = this.cache.$header.position(),
            outlineWidth = this.cache.$header.outerWidth(),
            outlineHeight = (this.cache.$header.outerHeight() + this.cache.$footer.outerHeight()) + parseInt(this.cache.$header.css('margin-bottom')),
            outlineTop = headerPosition.top,
            outlineLeft = headerPosition.left + parseInt(this.cache.$header.css('margin-left')),
            outlineBorderColor = 'rgb(' + props.headerFooterColor + ')',
            $outline = this.buildOutline(outlineWidth, outlineHeight, outlineTop, outlineLeft, outlineBorderColor, false);

        this.$el.append($outline);

        // Fade in contents and background colour
        TweenMax.to(this.cache.$headerFooterContents, 0.4, {opacity: '1', delay: 2}, Power2.ease);
        TweenMax.to(this.cache.$headerFooter, 0.4, {backgroundColor: 'rgba(' + props.headerFooterColor + ',1)', delay: 2}, Power2.ease);

        // Create image outline
        if (this.cache.$image.length) {
            var imagePosition = this.cache.$image.position(),
                outlineImageWidth = this.cache.$image.outerWidth(),
                outlineImageHeight = this.cache.$image.outerHeight(),
                outlineImageTop = imagePosition.top,
                outlineImageLeft = imagePosition.left,
                outlineImageBorderColor = this.cache.$image.css('color'),
                $outlineImage = this.buildOutline(outlineImageWidth, outlineImageHeight, outlineImageTop, outlineImageLeft, outlineImageBorderColor, true);

            this.$el.append($outlineImage);

            // Fade in contents
            TweenMax.to(this.cache.$imageContents, 0.4, {opacity: '1', delay: 2}, Power2.ease);
        }

        // Fade out outlines
        TweenMax.to(this.$el.find('.outline'), 0.4, {autoAlpha: 0, delay: 2}, Power2.ease);
    },
    templateHelpers: function() {
        return {

            date: function() {
                return moment(this.model.get('item').date, 'YYYYMMDD').format('MMM YYYY');
            }.bind(this),

            responsiveImages: function() {
                var responsiveImages = this.model.get('item').images.length > 1;
                return responsiveImages;
            }.bind(this)
        };
    }
});

module.exports = ArticleItemView;
