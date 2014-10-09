window.fix_div = function (div, height, right, fake_gen) {
    var div_offset = div.offset().top;
    var is_moving = false;
    if (typeof fake_gen !== 'undefined')
        fake_gen(div);
    var moving = function () {
        if (!is_moving) {
            div.css('position', 'absolute').css('top', div_offset);
            is_moving = true;
        }
    };
    var fix = function () {
        if (is_moving) {
            div.css('position', 'fixed').css('top', height);
            is_moving = false;
        }
    };
    if (right) div.css('right', $(window).width() - div.offset().left - div.outerWidth());
    moving();
    $(window).scroll(function () {
        ($(window).scrollTop() - div_offset > -height) ? fix() : moving();
    });
};

$(function () {
    fix_div($('#navigation'), 0, false, function (nav) {
        $('<div/>', {id: 'fake-nav'}).css('height', nav.height()).prependTo('#nav-head');;
    })
});
