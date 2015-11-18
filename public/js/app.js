var $ = require('jquery'),
    _ = require('lodash');

    var Obj = {
        // Elements Objs
        $cont: null,
        $trackCont: null,
        $slider: null,
        $nextBtn: null,
        $prevBtn: null,
        $arrayListOfElm: [],
        // Numbers & Bolean
        $currentWindowSize:0,
        $currentImgSize: 0,
        $currentSlidePostion: 0,
        $currentWindowWidth: 0,
        $numOfSlides: 0,
        $offset: 0,
        $offSetAdd: 0,
        $startingOfSlide: true,
        $endingOfSlide: false,
        $arrayPostion: null,
        $mousePostionH: 0,
        $mousePostionV: 0,

        init: function() {
            // ## Var ##
            this.$cont = $('.slider-container');
            this.$trackCont = $('ul.slider-track');
            this.$slider = $('ul.slider-track li');
            this.$numOfSlides = $('ul.slider-track li').length -1;
            this.$nextBtn = $('.btn-next');
            this.$prevBtn = $('.btn-prev');

            // ## Function  ##
            //Set current index
            this.addIndex();
            // Add class current to first li
            $(this.$slider[this.$currentSlidePostion]).addClass('current');
            // Find out Window width
            this.$currentWindowWidth = $(window).width();
            Obj.$currentImgSize = Obj.$slider.width();
            Obj.$slider.width(Obj.$currentWindowWidth);
            // Set current width of li
            this.$currentImgSize = this.$slider.width();
            // Set ul.track to the number of slides and the width of the image
            this.$trackCont.width(this.$currentImgSize * (this.$numOfSlides + 1));
            // set Prev to disable
            this.$prevBtn.addClass('disable');
            // Recalutelate img when the window resizes

            // Resize window changes width
            this.winResize();
            // Array of all the li content
            this.arrayOfsliderElms();
            // Finds out where your position
            this.startAndend();
            // Btn
            this.clickNextBtn();
            this.clickPrevBtn();

            this.dragQueen();

            console.table([{
                CurrentPostion: Obj.$currentSlidePostion,
                StartOfSlide: Obj.$startingOfSlide,
                EndOfSlide: Obj.$endingOfSlide,
                OffSet: Obj.$offSetAdd,
                CurrentImageSize: Obj.$currentImgSize,
                CurrentWindowSize: Obj.$currentWindowSize,
                NumberOfSlides: Obj.$numOfSlides
            }]);

        },

        // Add a index attr to each ls elm
        addIndex: function(){
            Obj.$slider.each(function(i){
                $(Obj.$slider[i]).attr( "index", i );
            });
        },

        // Grabs current size of image
        winResize: function(){
            $(window).on('resize',function() {
                Obj.$currentWindowWidth = $(window).width();
                Obj.$currentWindowHeight = $(window).height();
                Obj.$currentImgSize = Obj.$slider.width();
                Obj.$slider.width(Obj.$currentWindowWidth);
            });
        },

        dragQueen: function(){
            // Add a Drag Class to the current index elmm
            Obj.$slider.on('mousemove', function(elm){
                Obj.$mousePostionH = elm.pageX;
                Obj.$mousePostionV = elm.pageY;

                // console.table([{
                //     $mousePostionH: Obj.$mousePostionH,
                //     $mousePostionV: Obj.$mousePostionV
                // }]);

                return false;
            });

            Obj.$slider.on('mouseenter', function(elm){
                return false;
            });


        },

        // Put the ls elms in a array
        arrayOfsliderElms: function(){
            Obj.$slider.each(function(i,elm){
                Obj.$arrayListOfElm.push(elm);
            });
        },

        // Adds a disable class to the btn
        destroyBtn: function(){
            // if your at the starting of the slider
            if(Obj.$startingOfSlide) {
                Obj.$prevBtn.addClass('disable');
            } else {
                Obj.$prevBtn.removeClass('disable');
            }
            // if your at the end of slider
            if(Obj.$endingOfSlide) {
                Obj.$nextBtn.addClass('disable');
            } else {
                Obj.$nextBtn.removeClass('disable');
            }
        },

        // Tells me if i'm at the start or at the end
        startAndend: function() {
            // if your at the start of the slide
            if(Obj.$currentSlidePostion === 0) {
                Obj.$startingOfSlide = true;
            } else {
                Obj.$startingOfSlide = false;
            }

            // if your at the end of the slide let me know
            if (Obj.$currentSlidePostion === Obj.$numOfSlides) {
                Obj.$endingOfSlide = true;
            } else {
                Obj.$endingOfSlide = false;
            }
        },

        clickNextBtn: function(){
            Obj.$nextBtn.on('click',function(){

                if (Obj.$numOfSlides > Obj.$currentSlidePostion) {
                    Obj.$currentSlidePostion += 1;
                    Obj.$offSetAdd = Obj.$offset += Obj.$currentImgSize;
                }
                Obj.$trackCont.css('transform', 'translateX(-' + Obj.$offSetAdd + 'px)');

                Obj.startAndend();
                Obj.destroyBtn();

                console.table([{
                    CurrentPostion: Obj.$currentSlidePostion,
                    StartOfSlide: Obj.$startingOfSlide,
                    EndOfSlide: Obj.$endingOfSlide,
                    OffSet: Obj.$offSetAdd,
                    CurrentImageSize: Obj.$currentImgSize,
                    CurrentWindowSize: Obj.$currentWindowSize,
                    NumberOfSlides: Obj.$numOfSlides
                }]);

                return false;
            });
        },

        clickPrevBtn: function(){
            Obj.$prevBtn.on('click',function(){

                if (0 < Obj.$currentSlidePostion) {
                    Obj.$currentSlidePostion -= 1;
                    Obj.$offSetAdd = Obj.$offset -= Obj.$currentImgSize;
                }
                Obj.$trackCont.css('transform', 'translateX(-' + Obj.$offSetAdd + 'px)');

                Obj.startAndend();
                Obj.destroyBtn();

                return false;
            });
        }
    };

    Obj.init();
