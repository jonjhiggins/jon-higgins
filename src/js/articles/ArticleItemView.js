/*globals Bounce, Back, Elastic, Power2*/

var Marionette = require('backbone.marionette'),
    templateSingle = require('./ArticleTemplate.hbs'),
    templateCollection = require('./ArticleItemTemplate.hbs'),
    HandlebarsCompiler = require('hbsfy/runtime'),
    moment = require('moment'),
    TweenMax = require('gsap/src/uncompressed/TweenMax.js'),
    $ = require('jQuery'),
    ArticleItemView;

// Register handlebars markdown helper
HandlebarsCompiler.registerHelper('md', require('helper-md'));

ArticleItemView = Marionette.ItemView.extend({
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

    buildOutline: function(width, height, top, left, borderColor) {

        var $outline = $('<div class="outline"><span></span><span></span><span></span><span></span></div>');


        $outline.css({
            width: width,
            height: height,
            top: top,
            left: left,
            color: borderColor
        });

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

    onShow: function() {

        // Selectors
        var $header = this.$el.find('.article-item__header'),
            $footer = this.$el.find('.article-item__footer'),
            $headerFooter = this.$el.find('.article-item__header, .article-item__footer'),
            $image = this.$el.find('.article-item__image');

        // Create outline
        var outlineWidth = $header.outerWidth(),
            outlineHeight = $header.outerHeight() + $footer.outerHeight(),
            outlineTop = $header.position().top,
            outlineLeft = $header.position().left,
            outlineBorderColor = $header.css('background-color'),
            $outline = this.buildOutline(outlineWidth, outlineHeight, outlineTop, outlineLeft, outlineBorderColor);

        this.$el.append($outline);
        TweenMax.from($headerFooter.find('*'), 0.4, {opacity: '0', delay: 2}, Power2.ease);
        TweenMax.from($headerFooter, 0.4, {backgroundColor: 'rgba(255,255,255,0)', delay: 2}, Power2.ease);

        // Create image outline
        if ($image.length) {
            var outlineImageWidth = $image.outerWidth(),
                outlineImageHeight = $image.outerHeight(),
                outlineImageTop = $image.position().top,
                outlineImageLeft = $image.position().left,
                outlineImageBorderColor = $image.css('color'),
                $outlineImage = this.buildOutline(outlineImageWidth, outlineImageHeight, outlineImageTop, outlineImageLeft, outlineImageBorderColor);

            this.$el.append($outlineImage);
            TweenMax.from($image, 0.4, {backgroundColor: 'rgba(255,255,255,0)', delay: 2}, Power2.ease);
            TweenMax.from($image.find('*'), 0.4, {opacity: '0', delay: 2}, Power2.ease);
        }

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
