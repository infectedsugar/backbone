var $ = require('jquery'),
        _ = require('lodash'),
        Backbone = require('backbone');

    var sliderObj = {
        $cont:"",
        $trackCont:"",
        $slider:"",
        $currentSlide: 0,
        $numOfSlide: 0,
        $offset: 0,
        $currentImgSize: 0,
        $offSetAdd: 0,

        init: function() {
            // ## Var ##
            this.$cont = $('.slider-container');
            this.$trackCont = $('ul.slider-track');
            this.$slider = $('ul.slider-track li');
            this.$numOfSlide = $('ul.slider-track li').length;

            // ## Function  ##
            // Add class to current index
            $(this.$slider[this.$currentSlide]).addClass('current');
            // Set current width of li
            this.$currentImgSize = this.$slider.width();

            // Recalutelate img when the window resizes
            this.addIndex();
            // Resize window changes width
            this.winResize();
            // Btn
            this.clickNextBtn();
            this.clickPrevBtn();

        },
        // Add a index & Find out how many slides
        addIndex: function(){
            sliderObj.$slider.each(function(i){
                $(sliderObj.$slider[i]).attr( "index", i );
            });
        },

        // Grabs current size of image
        winResize: function() {
            $(window).on('resize',function(){
                sliderObj.$currentImgSize = sliderObj.$slider.width();
            });
        },

        //merge the prev and next to one function keep it dry baby
        clickNextBtn: function(){
            $('.btn-next').on('click',function(){
                sliderObj.$offSetAdd = sliderObj.$offset += sliderObj.$currentImgSize;

                // Added up index as long there is a element
                if (sliderObj.$numOfSlide > sliderObj.$currentSlide ) {
                    sliderObj.$currentSlide++;
                }
                // If class has current remove it.
                if ($(sliderObj.$slider).hasClass("current")) {
                    $(sliderObj.$slider).removeClass("current");
                }
                // If current slide add Class current
                // $(sliderObj.$slider[sliderObj.$currentSlide]).addClass("current");
                // turn left into transform for a better  GPU (Graphics Processing Unit)
                $(sliderObj.$slider[sliderObj.$currentSlide]).css('left','-'+ sliderObj.$offSetAdd +'px');

                return false;
            });
        },

        clickPrevBtn: function(){
            $('.btn-prev').on('click',function(){
                sliderObj.$offSetAdd = sliderObj.$offset += sliderObj.$currentImgSize;

                // Added up index as long there is a element
                if (sliderObj.$numOfSlide > sliderObj.$currentSlide ) {
                    sliderObj.$currentSlide++;
                }
                // If class has current remove it.
                if ($(sliderObj.$slider).hasClass("current")) {
                    $(sliderObj.$slider).removeClass("current");
                }
                // If current slide add Class current
                // $(sliderObj.$slider[sliderObj.$currentSlide]).addClass("current");
                // turn left into transform for a better  GPU (Graphics Processing Unit)
                $(sliderObj.$slider[sliderObj.$currentSlide]).css('left', sliderObj.$offSetAdd +'px');

                return false;
            });
        }
    };

    sliderObj.init();;
