$(document)
    .ready(function() {

        // Fix menu when passed
        $('.masthead')
            .visibility({
                once: false,
                onBottomPassed: function() {
                    $('.fixed.menu');
                },
                onBottomPassedReverse: function() {
                    $('.fixed.menu');
                }
            })
        ;

        // Create sidebar and attach to menu open
        $('#off-canvas')
            .sidebar('attach events', '.toc.item')
        ;

        // Initiate Semantic UI components
        $('.ui.accordion').accordion();
        $('.ui.dropdown:not(.simple)').dropdown();
        $('.with.tooltip').popup();
        $('.with.tooltip.onclick')
            .popup({
                on: 'click'
            })
        ;
        $('.ui.tabular.menu .item').tab();
        $('.ui.tabbed.menu .item').tab();
        $('.ui.sortable.table').tablesort();

        $('.ui.checkbox:not(.other):not(.collapsible):not(.slave)').checkbox();
        $('.ui.radio.checkbox:not(.other):not(.collapsible):not(.slave)').checkbox();

        $('.ui.dimmable')
            .dimmer({
                on: 'hover'
            })
        ;
        $('.ui.embed').embed();
        $('.ui.rating').rating('disable');

        // Make submenu scroll down with content area
        $('#submenu.sticky')
            .sticky({
                context: '#main',
                offset: $("#menu.sticky").height()
            })
        ;

        // Make first item in ToC active
        $('#submenu.toc :first-child').addClass('active');

        // Hide elements with class .hidden
        $('.hidden.element').hide();
    })
;

// Sticky navbar behaviour
$(function() {
    var $header = $("#menu");
    $(window).scroll(function() {
        var scroll = $(window).scrollTop();

        if (scroll >= 50) {
            $header.addClass("tightened");
        } else {
            $header.removeClass("tightened");
        }
    });
});

// Smooth anchor scrolling
// https://css-tricks.com/smooth-scrolling-accessibility/
$(function() {
    var offset = $("#menu.sticky").height();

    $('a[href*="#"]:not([href="#"])')
        .click(function() {
            if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
                var target = $(this.hash);

                target = target.length ? target : $('[name=' + this.hash.slice(1) +']');

                if (target.length) {
                    $('html, body').animate({
                        scrollTop: target.offset().top - offset
                    }, 1000);
                    target.focus(); // Setting focus
                    if (target.is(":focus")){ // Checking if the target was focused
                        return false;
                    } else {
                        target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
                        target.focus(); // Setting focus
                    }
                    return false;
                }
            }
        })

        // Highlight anchors in ToC menu
        .each(function() {
            var target = $(this.hash);
            var link = $(this);

            target.visibility({
                once: false,
                offset: offset + 10,
                onPassing: function() {
                    link.siblings().removeClass('active');
                    link.addClass('active');
                },
                onTopPassedReverse: function() {
                    link.prev().addClass('active');
                    link.removeClass('active');
                }
            });
        })
    ;
});

// Toggle function to show/hide divs with buttons
$('.visibility.toggle').click(function() {

    // Get data attributes from input
    var target = '#' + $(this).data('target');
    //var visibility = $(this).data('targetState');

    // Add hidden or visible class to target element
    //$(target).addClass(visibility);

    // Show target if it's hidden, otherwise hide it again
    if($(target).hasClass('hidden')) {
        $(target)
            .removeClass('hidden')
            .show(100)
        ;

        // Provide feedback through button
        $(this)
        // Change button styling to indicate that target is visible now
            .removeClass('disabled')
            // Inform user that the button will hide the target in this state
            .attr('data-content',$(this).data('content').replace(/Show|View|Display/,'Hide'))
        ;
    } else {
        $(target)
            .addClass('hidden')
            .hide(100)
        ;

        // Reset button styling and text
        $(this)
            .addClass('disabled')
            .attr('data-content',$(this).data('content').replace('Hide','Show'))
        ;
    }
});

// Close button in off-canvas menu
$('#off-canvas .close.button').click(function() {
    $('#off-canvas').sidebar('hide');
});

// Submit search form
$("#search-field i.link").click(function() {
    $("#search-field").submit();
});

// Submit login form
$("#form-login .submit").click(function() {
    $("#form-login").submit();
});


// Apply specific js through media queries
// The media queries are matched with Semantic UI breakpoints by onMediaQuery.js
// Available breakpoints: mobile, tablet, computer, large, widescreen
var $nav = $('#menu-dropdowns');
var queries = [
    {
        context: 'mobile',
        match: function() {
            $(document)
                .ready(function() {
                    // Turn Gallery grid into a slider on mobile
                    $('.slider-combo')
                        .removeClass('ui grid')
                        .addClass('cards')
                        .slick({
                            infinite: true,
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            dots: true
                        })
                    ;

                    // Turn Tabs into an accordion on mobile
                    $('.reducible.tab.segment')
                        .each(function() {
                            var target = $('.menu .item[data-tab="' + $(this).data('tab') + '"]');

                            // Move content below the heading
                            $(target).after(this);
                        })
                        .removeClass('tab segment')
                        .addClass('reduced content')
                    ;

                    // If pointing segments are used, temporarily disable them
                    $('.reducible.tabbed.menu > .pointing.segment')
                        .removeClass('segment')
                        .addClass('dormant-segment')
                    ;

                    // Remove tabular classes
                    $('.reducible.tabular.menu > .item, .reducible.tabbed.menu > .item')
                        .removeClass('item')
                        .addClass('reduced title')
                        .tab({
                            deactivate: 'all'
                        })
                    ;
                    $('.reducible.tabular.menu, .reducible.tabbed.menu')
                        .removeClass('tabular menu')
                        .addClass('fluid styled accordion')
                        .accordion()
                    ;
                })
            ;

            // Change position of segment pointer on mobile
            $('.testimonial .column > .left.pointing.segment')
                .removeClass('left')
                .addClass('down')
            ;
        },
        unmatch: function() {
            // We're leaving mobile
            $(document)
                .ready(function() {
                    $('.slider-combo')
                        .removeClass('cards')
                        .addClass('ui grid')
                        .slick('unslick')
                    ;

                    // Revert tabs back to normal
                    $('.reducible.accordion')
                        .removeClass('fluid styled accordion')

                        // Depending on their menu type, attach either tabbed or tabular
                        .each(function() {
                            if ($(this).hasClass('tabbed')) {
                                $(this).addClass('menu');
                            } else {
                                $(this).addClass('tabular menu');
                            }
                        })
                    ;
                    $('.reduced.title')
                        .removeClass('reduced title')
                        .addClass('item')
                    ;
                    $('.dormant-segment')
                        .removeClass('dormant-segment')
                        .addClass('segment')
                    ;
                    $('.reduced.content')
                        .removeClass('reduced content')
                        .addClass('tab segment')

                        // Move content back to original position
                        .each(function() {
                            if (($(this).data('menu-position') === 'right') || ($(this).data('menu-position') === 'left')) {
                                $(this).closest('.grid').find('.stretched.column').append($(this));
                                $(this).closest('.grid').find('.menu').addClass('fluid');
                            } else {
                                $(this).closest('.menu').after($(this));
                            }
                        })
                    ;

                    // Attach JS again
                    $('.ui.reducible.tabular.menu .item').tab();
                    $('.ui.reducible.tabbed.menu .item').tab();
                })
            ;

            // Restore position of segment pointer
            $('.testimonial .column > .down.pointing.segment')
                .removeClass('down')
                .addClass('left')
            ;
        }
    },{
        context: ['mobile', 'tablet'],
        match: function () {
            // On detail pages, make the first container fluid on smaller screens
            // so the stripe segments will snap to the edges
            $('body.detail #main > .ui.container')
                .addClass('fluid')
            ;
            $('body.detail #main > .ui.grid.container')
                .removeClass('grid')
            ;

            // Transform navigation into off-canvas accordion
            $nav.removeClass('right menu').accordion().appendTo('#off-canvas');
        },
        unmatch: function () {
            // We're leaving mobile
            $('body.detail #main > .ui.container')
                .removeClass('fluid')
                .addClass('grid')
            ;
        }
    },{
        context: ['computer','large','widescreen'],
        match: function() {
            $(document)
                .ready(function() {
                    $('#home')
                        .removeClass('pushable')
                    ;
                })
            ;

            // Add content wrapper for attaching classes for full-screen backgrounds
            $('#home .pusher')
                .addClass('content-wrapper')
            ;
        },
        unmatch: function() {
            // We're leaving computer
            $('#home .pusher')
                .removeClass('content-wrapper')
            ;
            $('#home')
                .addClass('pushable')
            ;
        }
    }
];
// Fire in the hole!
MQ.init(queries);

// Dropdown navigation
$nav.find('.simple.dropdown').each(function () {
    var $this = $(this);
    var $target = $this.find('> .content');
    var $items = $target.children();
    var groups = $items.length;
    var maxColumns = 5;

    if (groups < maxColumns) {
        var numbers = ['zero','one','two','three','four'];
        var columns = numbers[groups];
    } else {
        var columns = 'five';
    }

    // Dropdown is only intended for no-js situations
    $this.removeClass('dropdown');

    // Turn list into large popup menu
    $target.wrapAll('<span class="ui flowing basic popup"><span class="ui ' + columns + ' column internally celled grid"></span></span>');
    $target.find('.column.item').removeClass('item');
    $target.find('.menu').removeClass('menu').addClass('ui link list').css('margin-left', 0).find('.item').css('margin', 0);

    // Split list in order to properly add required rows
    for (var i=0; i < groups -maxColumns; i+=maxColumns) {
        $items.slice(i, i+maxColumns).appendTo($('<ul class="row menu">').insertBefore($target));
    }

    // Attach SUI popup event
    $this.find('> .title').popup({
        on: 'hover',
        inline: true,
        hoverable: true,
        exclusive: true,
        position: 'bottom center',
        lastResort: 'bottom right',
        //boundary   : '#header',
        //target     : '.ui.popup.patterns',
        delay: {
            show: 300,
            hide: 800
        }
    });

    MQ.addQuery({
        context: ['mobile','tablet'],
        match: function() {
            $(document)
                .ready(function() {
                    $nav.unbind('popup')
                })
            ;
        },
        unmatch: function() {
            $(document)
                .ready(function() {

                })
            ;
            //$nav.accordion().appendTo('#off-canvas');
        }
    });
});
