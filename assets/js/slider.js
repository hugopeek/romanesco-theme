$(document).ready(function(){
    // COLLISION ALERT!!
    // There's a checkbox type that also uses the slider class, see issue #77 on Github.
    // And in addition: there's also a Fomantic UI component now named Slider.

    // Default slider
    $('.slider-basic')
        .slick({
            //adaptiveHeight: true,
            infinite: true,
            //slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            dots: true
        })

        // Add class to parent of slider
        .parent().addClass('slider-wrapper')

        // Change background color for each slide
        // @Todo: needs more work. Data-attributes maybe, with color classes for each slide..
        //.on('afterChange', function(event,slick,currentSlide){
        //    $(this).addClass('orange')
        //})
    ;

    // Slider with minimal controls
    $('.slider-minimal')
        .slick({
            adaptiveHeight: true,
            arrows: false,
            dots: true
        })
    ;

    // Slider that functions as preview window for the synced navigation slider
    $('.slider-synced')
        .slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: true,
            asNavFor: '.slider-synced-nav'
        })
    ;

    // Slider that functions as navigation for the synced preview window
    $('.slider-synced-nav')
        .slick({
            slidesToScroll: 1,
            asNavFor: '.slider-synced',
            focusOnSelect: true
        })
    ;

    // Slider that turns Overview items into slides
    // @todo: needs more dynamic controls for number of slides
    $('.slider-overview')
        .find('.overview')
        .slick({
            adaptiveHeight: false,
            infinite: true,
            slidesToShow: 4,
            slidesToScroll: 1,
            arrows: true,
            dots: true,

            responsive: [
                {
                    breakpoint: 1300,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1
                    }
                },{
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                },{
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        arrows: false
                    }
                }
            ]
        })
        .find('.slick-track')
        .addClass('ui cards')
    ;

    // Nested slider layouts
    $('.nested.slider-wrapper')
        .find('.image.content')
        .removeClass('content rounded')
    ;

    // Initiate lightbox with integrated Slick slider.
    // This functionality relies on this script: https://github.com/mreq/slick-lightbox
    $('.with.lightbox:not(.with.caption)')
        .slickLightbox()
    ;

    // Show caption in lightbox too for items that have one
    $('.with.lightbox.with.caption')
        .slickLightbox({
            caption: 'caption'
        })
    ;

    // Use Slick to create full-screen presentations
    var fwh = $(window).height();
    var fww = $(window).width();
    var slider = $('.slider.fullscreen');

    slider.find('.slick-slide').attr('height',fwh);
    slider.find('.slick-slide').attr('width',fww);
    slider.find('.slick-list').attr('height',fwh);
});

// Adjust dimensions of fullscreen slider on resize
$(window).resize(function(){
    var slider = $('.slider.fullscreen');
    var i = slider.find('.slick-slide');
    var s = slider.find('.slick-list');

    i.attr('width',$(window).width());
    if(i.height() != $(window).height()){
        i.attr('height',$(window).height());
    }
    s.height($(window).height());
});