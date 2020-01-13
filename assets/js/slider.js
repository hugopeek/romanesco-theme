$(document).ready(function(){
    // COLLISION ALERT!!
    // There's a checkbox type that also uses the slider class, see issue #77 on Github.
    // And in addition: there's also a Fomantic UI component now named Slider.
    $('.slider-basic')

        // Initiate default slider
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
    $('.slider-minimal')

        // Initiate slider with minimal controls
        .slick({
            adaptiveHeight: true,
            arrows: false,
            dots: true
        })
    ;
    $('.slider-synced')

        // Initiate slider that functions as preview window for the synced navigation slider
        .slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: true,
            asNavFor: '.slider-synced-nav'
        })
    ;
    $('.slider-synced-nav')

        // Initiate slider that functions as navigation for the synced preview window
        .slick({
            slidesToScroll: 1,
            asNavFor: '.slider-synced',
            focusOnSelect: true
        })
    ;

    // Initiate lightbox with integrated Slick slider.
    // This functionality relies on this script: https://github.com/mreq/slick-lightbox
    $('.with.lightbox:not(.with.caption)')

        // Initiate default lightbox
        .slickLightbox()
    ;

    $('.with.lightbox.with.caption')

        // Show caption in lightbox too for items that have one
        .slickLightbox({
            caption: 'caption'
        })
    ;

    // Use Slick to create full-screen presentations
    var fwh = $(window).height();
    var fww = $(window).width();
    var slider = $('.slider-fullscreen');

    slider.find('.vertical.stripe.segment').attr('height',fwh);
    slider.find('.vertical.stripe.segment').attr('width',fww);
    slider.find('.slick-list').attr('height',fwh);
    slider.slick({
        adaptiveHeight: true,
        variableWidth: true,
        arrows: true,
        dots: true,
        centerMode: true
    });
});

// Adjust dimensions of fullscreen slider on resize
$(window).resize(function(){
    var slider = $('.slider-fullscreen');
    var i = slider.find('.vertical.stripe.segment');
    var s = slider.find('.slick-list');

    i.attr('width',$(window).width());
    if(i.height() != $(window).height()){
        i.attr('height',$(window).height());
    }
    s.height($(window).height());
});